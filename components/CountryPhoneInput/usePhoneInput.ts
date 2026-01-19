/**
 * CountryPhoneInput - Custom Hook
 * Manages the phone input state and protection logic
 */

import {
  useState,
  useCallback,
  useRef,
  useEffect,
  useMemo,
} from 'react';
import type { Country } from '@/data/countries';
import type { CountryPhoneInputProps, PhoneValue, PhoneInputState } from './types';
import {
  resolveInitialCountry,
  buildInputValue,
  getProtectedPrefixLength,
  formatDialCode,
  extractPhoneDigits,
  normalizeInputValue,
  isProtectedAction,
  sanitizePastedValue,
  buildPhoneValue,
  getFilteredCountries,
} from './utils';

interface UsePhoneInputOptions {
  value?: string;
  defaultValue?: string;
  defaultCountry?: string;
  defaultCode?: string;
  preferredCountries?: string[];
  onlyCountries?: string[];
  excludeCountries?: string[];
  distinct?: boolean;
  onChange?: (value: PhoneValue) => void;
  onCountryChange?: (country: Country) => void;
  disabled?: boolean;
  readOnly?: boolean;
}

export function usePhoneInput(options: UsePhoneInputOptions) {
  const {
    value: controlledValue,
    defaultValue,
    defaultCountry,
    defaultCode,
    preferredCountries,
    onlyCountries,
    excludeCountries,
    distinct,
    onChange,
    onCountryChange,
    disabled,
    readOnly,
  } = options;

  // Determine if controlled mode
  const isControlled = controlledValue !== undefined;

  // Filter countries based on props
  const filteredCountries = useMemo(
    () =>
      getFilteredCountries({
        preferredCountries,
        onlyCountries,
        excludeCountries,
        distinct,
      }),
    [preferredCountries, onlyCountries, excludeCountries, distinct]
  );

  // Resolve initial country from filtered list
  const initialCountry = useMemo(() => {
    const resolved = resolveInitialCountry(
      defaultCountry,
      defaultCode,
      defaultValue || controlledValue,
      'US'
    );
    // Make sure resolved country is in filtered list
    const inFiltered = filteredCountries.find(
      (c) => c.iso2.toUpperCase() === resolved.iso2.toUpperCase()
    );
    return inFiltered || filteredCountries[0] || resolved;
  }, [defaultCountry, defaultCode, defaultValue, controlledValue, filteredCountries]);

  // Initialize state
  const [state, setState] = useState<PhoneInputState>(() => {
    const country = initialCountry;
    const initialValue = controlledValue || defaultValue;
    let inputValue: string;

    if (initialValue) {
      const phoneDigits = extractPhoneDigits(initialValue, country.dialCode);
      inputValue = buildInputValue(country, phoneDigits);
    } else {
      inputValue = buildInputValue(country, '');
    }

    return {
      country,
      inputValue,
      cursorPosition: null,
    };
  });

  // Refs
  const inputRef = useRef<HTMLInputElement>(null);
  const previousValueRef = useRef(state.inputValue);
  const isInternalChangeRef = useRef(false);

  // Handle controlled value changes
  useEffect(() => {
    if (isControlled && controlledValue !== undefined && !isInternalChangeRef.current) {
      const phoneDigits = extractPhoneDigits(controlledValue, state.country.dialCode);
      const newInputValue = buildInputValue(state.country, phoneDigits);
      
      if (newInputValue !== state.inputValue) {
        setState((prev) => ({
          ...prev,
          inputValue: newInputValue,
        }));
      }
    }
    isInternalChangeRef.current = false;
  }, [controlledValue, isControlled, state.country, state.inputValue]);

  // Restore cursor position after state updates
  useEffect(() => {
    if (state.cursorPosition !== null && inputRef.current) {
      const pos = Math.max(
        state.cursorPosition,
        getProtectedPrefixLength(state.country.dialCode)
      );
      inputRef.current.setSelectionRange(pos, pos);
    }
  }, [state.cursorPosition, state.country.dialCode]);

  // Get current phone value
  const getPhoneValue = useCallback((): PhoneValue => {
    return buildPhoneValue(state.inputValue, state.country);
  }, [state.inputValue, state.country]);

  // Handle country change
  const handleCountryChange = useCallback(
    (iso2: string) => {
      if (disabled || readOnly) return;

      const newCountry = filteredCountries.find(
        (c) => c.iso2.toUpperCase() === iso2.toUpperCase()
      );

      if (!newCountry || newCountry.iso2 === state.country.iso2) return;

      // Preserve the phone digits when changing country
      const currentDigits = extractPhoneDigits(state.inputValue, state.country.dialCode);
      const newInputValue = buildInputValue(newCountry, currentDigits);

      isInternalChangeRef.current = true;

      setState((prev) => ({
        ...prev,
        country: newCountry,
        inputValue: newInputValue,
        cursorPosition: newInputValue.length,
      }));

      previousValueRef.current = newInputValue;

      // Trigger callbacks
      onCountryChange?.(newCountry);

      const phoneValue = buildPhoneValue(newInputValue, newCountry);
      onChange?.(phoneValue);
    },
    [
      disabled,
      readOnly,
      filteredCountries,
      state.country,
      state.inputValue,
      onChange,
      onCountryChange,
    ]
  );

  // Handle input change
  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (disabled || readOnly) return;

      const newValue = e.target.value;
      const protectedLength = getProtectedPrefixLength(state.country.dialCode);

      // Normalize the value to ensure dial code protection
      const normalizedValue = normalizeInputValue(
        newValue,
        state.country,
        previousValueRef.current
      );

      // Calculate cursor position
      let cursorPos = e.target.selectionStart || normalizedValue.length;
      
      // Ensure cursor is not in protected area
      if (cursorPos < protectedLength) {
        cursorPos = protectedLength;
      }

      isInternalChangeRef.current = true;

      setState((prev) => ({
        ...prev,
        inputValue: normalizedValue,
        cursorPosition: cursorPos,
      }));

      previousValueRef.current = normalizedValue;

      // Trigger onChange callback
      const phoneValue = buildPhoneValue(normalizedValue, state.country);
      onChange?.(phoneValue);
    },
    [disabled, readOnly, state.country, onChange]
  );

  // Handle keydown for protection logic
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (disabled || readOnly) return;

      const inputElement = e.currentTarget;
      const protectedLength = getProtectedPrefixLength(state.country.dialCode);

      // Check if this action would modify protected area
      if (isProtectedAction(e, inputElement, protectedLength)) {
        e.preventDefault();
        return;
      }

      // Handle Home key - move to after dial code
      if (e.key === 'Home' && !e.shiftKey) {
        e.preventDefault();
        inputElement.setSelectionRange(protectedLength, protectedLength);
        return;
      }

      // Handle Shift+Home - select from dial code end
      if (e.key === 'Home' && e.shiftKey) {
        e.preventDefault();
        const currentEnd = inputElement.selectionEnd || protectedLength;
        inputElement.setSelectionRange(protectedLength, currentEnd);
        return;
      }

      // Handle Ctrl/Cmd + A - select only phone number part
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'a') {
        e.preventDefault();
        inputElement.setSelectionRange(protectedLength, inputElement.value.length);
        return;
      }
    },
    [disabled, readOnly, state.country.dialCode]
  );

  // Handle paste
  const handlePaste = useCallback(
    (e: React.ClipboardEvent<HTMLInputElement>) => {
      if (disabled || readOnly) return;

      e.preventDefault();

      const pastedText = e.clipboardData.getData('text');
      const inputElement = e.currentTarget;
      const selectionStart = inputElement.selectionStart || 0;
      const selectionEnd = inputElement.selectionEnd || 0;

      const newValue = sanitizePastedValue(
        pastedText,
        state.inputValue,
        selectionStart,
        selectionEnd,
        state.country
      );

      const protectedLength = getProtectedPrefixLength(state.country.dialCode);
      const pastedDigits = pastedText.replace(/\D/g, '');
      
      // Calculate new cursor position
      let newCursorPos: number;
      if (selectionStart < protectedLength) {
        // If pasting at protected area, cursor goes to end
        newCursorPos = newValue.length;
      } else {
        // Cursor after pasted content
        newCursorPos = selectionStart + pastedDigits.length;
      }

      isInternalChangeRef.current = true;

      setState((prev) => ({
        ...prev,
        inputValue: newValue,
        cursorPosition: newCursorPos,
      }));

      previousValueRef.current = newValue;

      const phoneValue = buildPhoneValue(newValue, state.country);
      onChange?.(phoneValue);
    },
    [disabled, readOnly, state.inputValue, state.country, onChange]
  );

  // Handle selection to prevent selecting protected area
  const handleSelect = useCallback(
    (e: React.SyntheticEvent<HTMLInputElement>) => {
      const inputElement = e.currentTarget;
      const protectedLength = getProtectedPrefixLength(state.country.dialCode);
      const { selectionStart, selectionEnd } = inputElement;

      // If selection includes protected area, adjust it
      if (selectionStart !== null && selectionStart < protectedLength) {
        // If it's just cursor position (no selection), move to protected end
        if (selectionStart === selectionEnd) {
          inputElement.setSelectionRange(protectedLength, protectedLength);
        } else if (selectionEnd !== null && selectionEnd > protectedLength) {
          // Has selection that overlaps protected area, adjust start
          inputElement.setSelectionRange(protectedLength, selectionEnd);
        }
      }
    },
    [state.country.dialCode]
  );

  // Focus handler - ensure cursor is in editable area
  const handleFocus = useCallback(
    (e: React.FocusEvent<HTMLInputElement>) => {
      const inputElement = e.currentTarget;
      const protectedLength = getProtectedPrefixLength(state.country.dialCode);

      // Move cursor to end of protected area if it's at start
      requestAnimationFrame(() => {
        if (inputElement.selectionStart !== null) {
          if (inputElement.selectionStart < protectedLength) {
            inputElement.setSelectionRange(protectedLength, protectedLength);
          }
        }
      });
    },
    [state.country.dialCode]
  );

  // Click handler - prevent clicking in protected area
  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLInputElement>) => {
      const inputElement = e.currentTarget;
      const protectedLength = getProtectedPrefixLength(state.country.dialCode);

      requestAnimationFrame(() => {
        const { selectionStart, selectionEnd } = inputElement;
        if (selectionStart !== null && selectionStart < protectedLength) {
          if (selectionStart === selectionEnd) {
            inputElement.setSelectionRange(protectedLength, protectedLength);
          }
        }
      });
    },
    [state.country.dialCode]
  );

  // Imperative methods
  const focus = useCallback(() => {
    inputRef.current?.focus();
  }, []);

  const blur = useCallback(() => {
    inputRef.current?.blur();
  }, []);

  const clear = useCallback(() => {
    if (disabled || readOnly) return;

    const newInputValue = buildInputValue(state.country, '');
    
    isInternalChangeRef.current = true;

    setState((prev) => ({
      ...prev,
      inputValue: newInputValue,
      cursorPosition: getProtectedPrefixLength(state.country.dialCode),
    }));

    previousValueRef.current = newInputValue;

    const phoneValue = buildPhoneValue(newInputValue, state.country);
    onChange?.(phoneValue);
  }, [disabled, readOnly, state.country, onChange]);

  const setCountry = useCallback(
    (iso2: string) => {
      handleCountryChange(iso2);
    },
    [handleCountryChange]
  );

  return {
    // State
    state,
    filteredCountries,
    inputRef,

    // Handlers
    handleCountryChange,
    handleInputChange,
    handleKeyDown,
    handlePaste,
    handleSelect,
    handleFocus,
    handleClick,

    // Methods
    focus,
    blur,
    clear,
    setCountry,
    getPhoneValue,
  };
}
