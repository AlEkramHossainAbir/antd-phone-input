import * as React$1 from 'react';
import React__default, { ReactNode } from 'react';
import { SelectProps, InputProps } from 'antd';

/**
 * Country data interface
 */
interface Country {
    /** Country name in English */
    name: string;
    /** ISO 3166-1 alpha-2 country code (e.g., "US", "BD") */
    iso2: string;
    /** International dialing code without + (e.g., "1", "880") */
    dialCode: string;
    /** Priority for countries sharing same dial code (lower = higher priority) */
    priority?: number;
    /** Area codes for countries like US/Canada */
    areaCodes?: string[];
    /** Format pattern for phone number (optional) */
    format?: string;
}
/**
 * Comprehensive country data with dialing codes
 * Derived from ITU-T E.164 and common international sources
 */
declare const countries: Country[];
/**
 * Get country by ISO2 code
 */
declare function getCountryByIso2(iso2: string): Country | undefined;
/**
 * Get countries by dial code
 */
declare function getCountriesByDialCode(dialCode: string): Country[];
/**
 * Find best matching country for a dial code (considering priority)
 */
declare function getBestCountryForDialCode(dialCode: string): Country | undefined;
/**
 * Search countries by name, ISO2 code, or dial code
 */
declare function searchCountries$1(query: string, countryList?: Country[]): Country[];
/**
 * Default country (United States)
 */
declare const defaultCountry: Country;

/**
 * CountryPhoneInput - Type Definitions
 * Production-ready phone input component for Ant Design
 */

/**
 * Structured phone value returned by the component
 */
interface PhoneValue {
    /** Full phone number including dial code (e.g., "+1234567890") */
    fullNumber: string;
    /** Phone number without dial code (e.g., "234567890") */
    phoneNumber: string;
    /** Country dial code with + (e.g., "+1") */
    dialCode: string;
    /** Country dial code without + (e.g., "1") */
    rawDialCode: string;
    /** ISO2 country code (e.g., "US") */
    countryCode: string;
    /** Country data object */
    country: Country | null;
    /** Whether the phone number is valid (basic validation) */
    isValid: boolean;
}
/**
 * Props passed through to Ant Design Select
 * Excludes props that are managed internally
 */
type SelectPassthroughProps = Omit<SelectProps, 'value' | 'onChange' | 'options' | 'showSearch' | 'filterOption' | 'optionLabelProp' | 'optionFilterProp' | 'popupRender' | 'suffixIcon' | 'getPopupContainer' | 'notFoundContent' | 'placeholder'>;
/**
 * Props passed through to Ant Design Input
 * Excludes props that are managed internally
 */
type InputPassthroughProps = Omit<InputProps, 'value' | 'onChange' | 'onKeyDown' | 'onPaste' | 'onSelect' | 'addonBefore' | 'prefix'>;
/**
 * Main component props
 */
interface CountryPhoneInputProps {
    /** Controlled value - full phone number with dial code */
    value?: string;
    /** Default value for uncontrolled mode */
    defaultValue?: string;
    /** Default country by ISO2 code (e.g., "US", "BD") */
    defaultCountry?: string;
    /** Default country by dial code (e.g., "1", "880") */
    defaultCode?: string;
    /** Callback when phone value changes */
    onChange?: (value: PhoneValue) => void;
    /** Callback when country changes */
    onCountryChange?: (country: Country) => void;
    /** ISO2 codes of countries to show at the top of the list */
    preferredCountries?: string[];
    /** ISO2 codes of countries to include exclusively */
    onlyCountries?: string[];
    /** ISO2 codes of countries to exclude */
    excludeCountries?: string[];
    /** Show only distinct dial codes (one country per dial code) */
    distinct?: boolean;
    /** Enable search in dropdown */
    enableSearch?: boolean;
    /** Custom search icon (appears on left side of search input) */
    searchIcon?: ReactNode;
    /** Placeholder for search input */
    searchPlaceholder?: string;
    /** Content shown when search has no results */
    searchNotFound?: ReactNode;
    /** Show dropdown arrow */
    enableArrow?: boolean;
    /** Custom dropdown arrow icon */
    dropdownIcon?: ReactNode;
    /** Completely disable the dropdown */
    disableDropdown?: boolean;
    /** Custom dropdown render function */
    popupRender?: SelectProps['popupRender'];
    /** Container for dropdown portal (same as AntD Select) */
    getPopupContainer?: (triggerNode: HTMLElement) => HTMLElement;
    /** Use SVG flags (true) or emoji/PNG fallback (false) */
    useSVG?: boolean;
    /** Base URL for flag images when useSVG is true */
    flagUrl?: string;
    /** Disable parentheses in formatted phone number */
    disableParentheses?: boolean;
    /** Show country code in the input as prefix */
    showDialCode?: boolean;
    /** Format the phone number as user types */
    formatOnType?: boolean;
    /** Props passed to Ant Design Select */
    selectProps?: SelectPassthroughProps;
    /** Props passed to Ant Design Input */
    inputProps?: InputPassthroughProps;
    /** Additional class name for the wrapper */
    className?: string;
    /** Additional class name for the select */
    selectClassName?: string;
    /** Additional class name for the input */
    inputClassName?: string;
    /** Inline styles for the wrapper */
    style?: React.CSSProperties;
    /** Size of the input (matches AntD sizes) */
    size?: 'small' | 'middle' | 'large';
    /** Disabled state */
    disabled?: boolean;
    /** Read-only state */
    readOnly?: boolean;
    /** Placeholder for the phone input */
    placeholder?: string;
    /** Border style variant */
    variant?: 'outlined' | 'borderless' | 'filled';
    /** Show error/warning status */
    status?: 'error' | 'warning';
}
/**
 * Ref handle for imperative operations
 */
interface CountryPhoneInputRef {
    /** Focus the phone input field */
    focus: () => void;
    /** Blur the phone input field */
    blur: () => void;
    /** Get the current phone value */
    getValue: () => PhoneValue;
    /** Set the country programmatically */
    setCountry: (iso2: string) => void;
    /** Clear the phone number (keeps dial code) */
    clear: () => void;
    /** Get the input element */
    getInputElement: () => HTMLInputElement | null;
}
/**
 * Internal state for the component
 */
interface PhoneInputState {
    /** Currently selected country */
    country: Country;
    /** Current input value (includes dial code) */
    inputValue: string;
    /** Cursor position to restore after updates */
    cursorPosition: number | null;
}

/**
 * CountryPhoneInput - Main Component
 * A production-ready phone input component for Ant Design
 *
 * Features:
 * - Country selection with searchable dropdown
 * - Protected dial code that cannot be deleted
 * - Full Ant Design integration
 * - Controlled and uncontrolled modes
 * - SSR-safe
 *
 * @example
 * ```tsx
 * <CountryPhoneInput
 *   defaultCountry="US"
 *   onChange={(value) => console.log(value)}
 *   preferredCountries={['US', 'GB', 'CA']}
 * />
 * ```
 */

/**
 * CountryPhoneInput Component
 *
 * A composite phone input with country selection that integrates
 * seamlessly with Ant Design forms and components.
 */
declare const CountryPhoneInput: React__default.ForwardRefExoticComponent<CountryPhoneInputProps & React__default.RefAttributes<CountryPhoneInputRef>>;

/**
 * CountryPhoneInput - Utility Functions
 * Handles country filtering, phone formatting, and input protection
 */

interface FilterOptions {
    preferredCountries?: string[];
    onlyCountries?: string[];
    excludeCountries?: string[];
    distinct?: boolean;
}
/**
 * Filter and sort countries based on configuration
 */
declare function getFilteredCountries(options: FilterOptions): Country[];
/**
 * Search countries by name, ISO2 code, or dial code
 */
declare function searchCountries(query: string, countryList: Country[]): Country[];
/**
 * Get maximum phone number length (excluding dial code) for a country.
 * Calculates from the country format pattern.
 * Returns 0 if no format is defined (no limit).
 */
declare function getMaxPhoneLength(country: Country): number;
/**
 * Get the effective max phone length for a country.
 * Uses overrides first, then falls back to format calculation.
 */
declare function getEffectiveMaxPhoneLength(country: Country): number;
/**
 * Resolve the initial country based on props
 */
declare function resolveInitialCountry(defaultCountry?: string, defaultCode?: string, defaultValue?: string, fallbackIso2?: string): Country;
/**
 * Guess country from a phone number string
 */
declare function guessCountryFromPhone(phone: string): Country | undefined;
/**
 * Format dial code with + prefix
 */
declare function formatDialCode(dialCode: string): string;
/**
 * Get the protected prefix length (dial code + space)
 */
declare function getProtectedPrefixLength(dialCode: string): number;
/**
 * Build the initial input value from country and optional phone digits
 */
declare function buildInputValue(country: Country, phoneDigits?: string): string;
/**
 * Extract phone digits from the full input value
 */
declare function extractPhoneDigits(inputValue: string, dialCode: string): string;
/**
 * Build the PhoneValue object from current state
 */
declare function buildPhoneValue(inputValue: string, country: Country | null): PhoneValue;
/**
 * Default flag CDN URL (flagcdn.com provides free SVG flags)
 */
declare const DEFAULT_FLAG_CDN = "https://flagcdn.com";
/**
 * Get flag URL for a country
 */
declare function getFlagUrl(iso2: string, useSVG?: boolean, customBaseUrl?: string): string;
/**
 * Get flag emoji for a country (fallback when images fail)
 */
declare function getFlagEmoji(iso2: string): string;

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
declare function usePhoneInput(options: UsePhoneInputOptions): {
    state: PhoneInputState;
    filteredCountries: Country[];
    inputRef: React$1.RefObject<HTMLInputElement | null>;
    handleCountryChange: (iso2: string) => void;
    handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
    handlePaste: (e: React.ClipboardEvent<HTMLInputElement>) => void;
    handleSelect: (e: React.SyntheticEvent<HTMLInputElement>) => void;
    handleFocus: (e: React.FocusEvent<HTMLInputElement>) => void;
    handleClick: (e: React.MouseEvent<HTMLInputElement>) => void;
    focus: () => void;
    blur: () => void;
    clear: () => void;
    setCountry: (iso2: string) => void;
    getPhoneValue: () => PhoneValue;
};

export { type Country, CountryPhoneInput, type CountryPhoneInputProps, type CountryPhoneInputRef, DEFAULT_FLAG_CDN, type InputPassthroughProps, type PhoneInputState, type PhoneValue, type SelectPassthroughProps, buildInputValue, buildPhoneValue, countries, CountryPhoneInput as default, defaultCountry, extractPhoneDigits, formatDialCode, getBestCountryForDialCode, getCountriesByDialCode, getCountryByIso2, getEffectiveMaxPhoneLength, getFilteredCountries, getFlagEmoji, getFlagUrl, getMaxPhoneLength, getProtectedPrefixLength, guessCountryFromPhone, resolveInitialCountry, searchCountries, searchCountries$1 as searchCountriesData, usePhoneInput };
