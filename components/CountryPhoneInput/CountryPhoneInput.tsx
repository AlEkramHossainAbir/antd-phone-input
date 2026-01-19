'use client';

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

import React, {
  forwardRef,
  useImperativeHandle,
  useMemo,
  useCallback,
  useState,
} from 'react';
import { Select, Input, Space, ConfigProvider, theme } from 'antd';
import type { SelectProps } from 'antd';
import { DownOutlined } from '@ant-design/icons';

import type { Country } from '@/data/countries';
import type {
  CountryPhoneInputProps,
  CountryPhoneInputRef,
} from './types';
import { usePhoneInput } from './usePhoneInput';
import {
  getFlagUrl,
  getFlagEmoji,
  searchCountries,
} from './utils';

import styles from './CountryPhoneInput.module.css';

/**
 * Flag component with fallback to emoji
 */
const CountryFlag: React.FC<{
  iso2: string;
  useSVG?: boolean;
  flagUrl?: string;
  size?: number;
}> = React.memo(({ iso2, useSVG = true, flagUrl, size = 20 }) => {
  const [error, setError] = useState(false);

  if (error) {
    return (
      <span className={styles.flagEmoji} style={{ fontSize: size }}>
        {getFlagEmoji(iso2)}
      </span>
    );
  }

  return (
    <img
      src={getFlagUrl(iso2, useSVG, flagUrl)}
      alt={`${iso2} flag`}
      className={styles.flagImage}
      style={{ width: size, height: Math.round(size * 0.75) }}
      onError={() => setError(true)}
      loading="lazy"
    />
  );
});

CountryFlag.displayName = 'CountryFlag';

/**
 * Country option renderer
 */
const CountryOption: React.FC<{
  country: Country;
  useSVG?: boolean;
  flagUrl?: string;
}> = React.memo(({ country, useSVG, flagUrl }) => {
  return (
    <div className={styles.countryOption}>
      <CountryFlag iso2={country.iso2} useSVG={useSVG} flagUrl={flagUrl} />
      <span className={styles.countryName}>{country.name}</span>
      <span className={styles.dialCode}>+{country.dialCode}</span>
    </div>
  );
});

CountryOption.displayName = 'CountryOption';

/**
 * Selected country display (in the Select trigger)
 */
const SelectedCountry: React.FC<{
  country: Country;
  useSVG?: boolean;
  flagUrl?: string;
}> = React.memo(({ country, useSVG, flagUrl }) => {
  return (
    <div className={styles.selectedCountry}>
      <CountryFlag iso2={country.iso2} useSVG={useSVG} flagUrl={flagUrl} size={18} />
    </div>
  );
});

SelectedCountry.displayName = 'SelectedCountry';

/**
 * CountryPhoneInput Component
 * 
 * A composite phone input with country selection that integrates
 * seamlessly with Ant Design forms and components.
 */
const CountryPhoneInput = forwardRef<CountryPhoneInputRef, CountryPhoneInputProps>(
  (props, ref) => {
    const {
      // Value props
      value,
      defaultValue,
      defaultCountry,
      defaultCode,
      onChange,
      onCountryChange,

      // Country filtering
      preferredCountries,
      onlyCountries,
      excludeCountries,
      distinct,

      // Dropdown config
      enableSearch = true,
      searchPlaceholder = 'Search country...',
      searchNotFound = 'No country found',
      enableArrow = true,
      dropdownIcon,
      disableDropdown = false,
      dropdownRender,
      getPopupContainer,

      // Display config
      useSVG = true,
      flagUrl,
      disableParentheses = false,
      showDialCode = true,
      formatOnType = false,

      // Passthrough props
      selectProps,
      inputProps,

      // Styling
      className,
      selectClassName,
      inputClassName,
      style,
      size = 'middle',
      disabled = false,
      readOnly = false,
      placeholder = 'Phone number',
      variant = 'outlined',
      status,
    } = props;

    // Use the custom hook for state management
    const {
      state,
      filteredCountries,
      inputRef,
      handleCountryChange,
      handleInputChange,
      handleKeyDown,
      handlePaste,
      handleSelect,
      handleFocus,
      handleClick,
      focus,
      blur,
      clear,
      setCountry,
      getPhoneValue,
    } = usePhoneInput({
      value,
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
    });

    // Expose imperative methods
    useImperativeHandle(
      ref,
      () => ({
        focus,
        blur,
        getValue: getPhoneValue,
        setCountry,
        clear,
        getInputElement: () => inputRef.current,
      }),
      [focus, blur, getPhoneValue, setCountry, clear, inputRef]
    );

    // Search state for dropdown
    const [searchValue, setSearchValue] = useState('');

    // Filter countries based on search
    const displayCountries = useMemo(() => {
      if (!searchValue) return filteredCountries;
      return searchCountries(searchValue, filteredCountries);
    }, [filteredCountries, searchValue]);

    // Build Select options
    const selectOptions = useMemo(() => {
      return displayCountries.map((country) => ({
        value: country.iso2,
        label: (
          <CountryOption country={country} useSVG={useSVG} flagUrl={flagUrl} />
        ),
        // For search filtering
        searchText: `${country.name} ${country.iso2} ${country.dialCode}`.toLowerCase(),
      }));
    }, [displayCountries, useSVG, flagUrl]);

    // Handle Select change
    const onSelectChange = useCallback(
      (iso2: string) => {
        handleCountryChange(iso2);
        setSearchValue(''); // Clear search after selection
      },
      [handleCountryChange]
    );

    // Handle search
    const onSearch = useCallback((value: string) => {
      setSearchValue(value);
    }, []);

    // Custom filter function
    const filterOption: SelectProps['filterOption'] = useCallback(
      (input: string, option: any) => {
        if (!option?.searchText) return false;
        return option.searchText.includes(input.toLowerCase());
      },
      []
    );

    // Dropdown suffix icon
    const suffixIcon = useMemo(() => {
      if (!enableArrow) return null;
      if (dropdownIcon) return dropdownIcon;
      return <DownOutlined className={styles.arrowIcon} />;
    }, [enableArrow, dropdownIcon]);

    // Get size class
    const sizeClass = useMemo(() => {
      switch (size) {
        case 'small':
          return styles.sizeSmall;
        case 'large':
          return styles.sizeLarge;
        default:
          return styles.sizeMiddle;
      }
    }, [size]);

    // Wrapper class
    const wrapperClassName = useMemo(() => {
      return [
        styles.wrapper,
        sizeClass,
        disabled && styles.disabled,
        readOnly && styles.readOnly,
        status === 'error' && styles.error,
        status === 'warning' && styles.warning,
        className,
      ]
        .filter(Boolean)
        .join(' ');
    }, [sizeClass, disabled, readOnly, status, className]);

    return (
      <div className={wrapperClassName} style={style}>
        <Space.Compact block className={styles.inputGroup}>
          {/* Country Select */}
          <Select
            {...selectProps}
            className={`${styles.countrySelect} ${selectClassName || ''}`}
            value={state.country.iso2}
            onChange={onSelectChange}
            options={selectOptions}
            showSearch={enableSearch}
            filterOption={filterOption}
            onSearch={onSearch}
            searchValue={searchValue}
            optionLabelProp="label"
            suffixIcon={suffixIcon}
            disabled={disabled || disableDropdown}
            size={size}
            variant={variant}
            status={status}
            dropdownRender={dropdownRender}
            getPopupContainer={getPopupContainer}
            notFoundContent={searchNotFound}
            popupMatchSelectWidth={280}
            dropdownStyle={{ minWidth: 280 }}
            labelRender={() => (
              <SelectedCountry
                country={state.country}
                useSVG={useSVG}
                flagUrl={flagUrl}
              />
            )}
          />

          {/* Phone Input */}
          <Input
            {...inputProps}
            ref={inputRef}
            className={`${styles.phoneInput} ${inputClassName || ''}`}
            value={state.inputValue}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            onPaste={handlePaste}
            onSelect={handleSelect}
            onFocus={handleFocus}
            onClick={handleClick}
            placeholder={placeholder}
            disabled={disabled}
            readOnly={readOnly}
            size={size}
            variant={variant}
            status={status}
          />
        </Space.Compact>
      </div>
    );
  }
);

CountryPhoneInput.displayName = 'CountryPhoneInput';

export default CountryPhoneInput;
