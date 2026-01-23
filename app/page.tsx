'use client';

import React, { useState, useRef } from 'react';
import {
  Form,
  Button,
  Card,
  Typography,
  Space,
  Divider,
  Switch,
  Select,
  message,
  ConfigProvider,
  theme,
  Tag,
  Collapse,
} from 'antd';
import { CodeOutlined } from '@ant-design/icons';
import {CountryPhoneInput} from '@/src';
import type { CountryPhoneInputRef, PhoneValue } from '@/src';

const { Title, Text, Paragraph } = Typography;

/**
 * Expandable code snippet component
 */
const CodeBlock: React.FC<{ code: string; title?: string }> = ({ 
  code, 
  title = 'View Code' 
}) => {
  return (
    <Collapse
      ghost
      size="small"
      items={[
        {
          key: '1',
          label: (
            <Space size={4}>
              <CodeOutlined />
              <span>{title}</span>
            </Space>
          ),
          children: (
            <pre
              style={{
                margin: 0,
                padding: 12,
                background: '#1a1a1a',
                borderRadius: 6,
                overflow: 'auto',
                fontSize: 12,
                lineHeight: 1.5,
              }}
            >
              <code style={{ color: '#e6e6e6' }}>{code}</code>
            </pre>
          ),
        },
      ]}
      style={{ marginTop: 12 }}
    />
  );
};

export default function Home() {
  // Demo state
  const [phoneValue, setPhoneValue] = useState<PhoneValue | null>(null);
  const [enableSearch, setEnableSearch] = useState(true);
  const [enableArrow, setEnableArrow] = useState(true);
  const [disabled, setDisabled] = useState(false);
  const [readOnly, setReadOnly] = useState(false);
  const [size, setSize] = useState<'small' | 'middle' | 'large'>('middle');
  const [status, setStatus] = useState<'error' | 'warning' | undefined>(undefined);
  const [darkMode, setDarkMode] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  // Ref for imperative methods
  const phoneInputRef = useRef<CountryPhoneInputRef>(null);

  // Form handling
  const [form] = Form.useForm();

  interface FormValues {
    phone?: PhoneValue;
    [key: string]: unknown;
  }

  const handleFormSubmit = (values: FormValues) => {
    console.log('Form values:', values);
    message.success('Form submitted! Check console for values.');
  };

  const handleChange = (value: PhoneValue) => {
    setPhoneValue(value);
    console.log('Phone changed:', value);
  };

  return (
    <ConfigProvider
      theme={{
        algorithm: darkMode ? theme.darkAlgorithm : theme.defaultAlgorithm,
      }}
    >
      <div
        style={{
          minHeight: '100vh',
          padding: 24,
          background: darkMode ? '#141414' : '#f5f5f5',
        }}
      >
        <div style={{ maxWidth: 900, margin: '0 auto' }}>
          <Title level={2} style={{ marginBottom: 8 }}>
            CountryPhoneInput Component
          </Title>
          <Paragraph type="secondary" style={{ marginBottom: 32 }}>
            A production-ready phone input component for Ant Design with protected dial codes,
            country selection, and full TypeScript support.
          </Paragraph>

          {/* Theme Toggle */}
          <Space style={{ marginBottom: 24 }}>
            <Text>Dark Mode:</Text>
            <Switch checked={darkMode} onChange={setDarkMode} />
          </Space>

          <Space direction="vertical" size="large" style={{ width: '100%' }}>
            {/* Basic Usage */}
            <Card title="Basic Usage" size="small">
              <Space direction="vertical" style={{ width: '100%' }} size="middle">
                 <CountryPhoneInput
                  defaultCountry="US"
                  onChange={handleChange}
                  placeholder="Enter phone number"
                />

                {phoneValue && (
                  <div
                    style={{
                      padding: 12,
                      background: darkMode ? '#1f1f1f' : '#fafafa',
                      borderRadius: 6,
                      fontSize: 13,
                    }}
                  >
                    <Space direction="vertical" size={4}>
                      <Text>
                        <strong>Full Number:</strong> {phoneValue.fullNumber}
                      </Text>
                      <Text>
                        <strong>Phone Digits:</strong> {phoneValue.phoneNumber || '(empty)'}
                      </Text>
                      <Text>
                        <strong>Dial Code:</strong> {phoneValue.dialCode}
                      </Text>
                      <Text>
                        <strong>Country:</strong> {phoneValue.country?.name} ({phoneValue.countryCode})
                      </Text>
                      <Text>
                        <strong>Valid:</strong>{' '}
                        <Tag color={phoneValue.isValid ? 'success' : 'default'}>
                          {phoneValue.isValid ? 'Yes' : 'No'}
                        </Tag>
                      </Text>
                    </Space>
                  </div>
                )}

                <CodeBlock code={`import { CountryPhoneInput } from 'antd-country-phone-picker';

<CountryPhoneInput
  defaultCountry="US"
  onChange={(value) => console.log(value)}
  placeholder="Enter phone number"
/>`} />
              </Space>
            </Card>

            <Card title="Grouped Style" size="small">
              <Space direction="vertical" style={{ width: '100%' }} size="middle">
                <CountryPhoneInput
                  defaultCountry="BD"
                  onChange={handleChange}
                  placeholder="Enter phone number"
                  grouped={true}
                />

                

                <CodeBlock code={`import { CountryPhoneInput } from 'antd-country-phone-picker';

<CountryPhoneInput
  defaultCountry="US"
  onChange={handleChange}
  placeholder="Enter phone number"
  grouped={true}
/>`} />
              </Space>
            </Card>

            {/* With Preferred Countries */}
            <Card title="Preferred Countries" size="small">
              <Paragraph type="secondary" style={{ marginBottom: 16 }}>
                Show specific countries at the top of the dropdown.
              </Paragraph>
              <CountryPhoneInput
                defaultCountry="GB"
                preferredCountries={['US', 'GB', 'CA', 'AU', 'DE', 'FR']}
                placeholder="Phone number"
              />
              <CodeBlock code={`<CountryPhoneInput
  defaultCountry="GB"
  preferredCountries={['US', 'GB', 'CA', 'AU', 'DE', 'FR']}
  placeholder="Phone number"
/>`} />
            </Card>

            {/* Country Filtering */}
            <Card title="Only Specific Countries" size="small">
              <Paragraph type="secondary" style={{ marginBottom: 16 }}>
                Limit selection to specific countries only.
              </Paragraph>
              <CountryPhoneInput
                defaultCountry="US"
                onlyCountries={['US', 'CA', 'MX']}
                placeholder="North America only"
              />
              <CodeBlock code={`<CountryPhoneInput
  defaultCountry="US"
  onlyCountries={['US', 'CA', 'MX']}
  placeholder="North America only"
/>`} />
            </Card>

            {/* Exclude Countries */}
            <Card title="Exclude Countries" size="small">
              <Paragraph type="secondary" style={{ marginBottom: 16 }}>
                Exclude specific countries from the list.
              </Paragraph>
              <CountryPhoneInput
                defaultCountry="GB"
                excludeCountries={['RU', 'CN', 'KP']}
                placeholder="Some countries excluded"
              />
              <CodeBlock code={`<CountryPhoneInput
  defaultCountry="GB"
  excludeCountries={['RU', 'CN', 'KP']}
  placeholder="Some countries excluded"
/>`} />
            </Card>

            {/* Form Integration */}
            <Card title="Form Integration" size="small">
              <Form form={form} onFinish={handleFormSubmit} layout="vertical">
                <Form.Item
                  name="phone"
                  label="Phone Number"
                  rules={[
                    {
                      validator: (_, value: PhoneValue) => {
                        if (!value || !value.phoneNumber) {
                          return Promise.reject('Please enter a phone number');
                        }
                        if (!value.isValid) {
                          return Promise.reject('Please enter a valid phone number');
                        }
                        return Promise.resolve();
                      },
                    },
                  ]}
                >
                  <CountryPhoneInput
                    defaultCountry="BD"
                    preferredCountries={['BD', 'US', 'GB']}
                  />
                </Form.Item>
                <Form.Item>
                  <Button type="primary" htmlType="submit">
                    Submit
                  </Button>
                </Form.Item>
              </Form>
              <CodeBlock code={`<Form form={form} onFinish={handleSubmit}>
  <Form.Item
    name="phone"
    label="Phone Number"
    rules={[{
      validator: (_, value) => {
        if (!value?.phoneNumber) {
          return Promise.reject('Please enter a phone number');
        }
        if (!value.isValid) {
          return Promise.reject('Please enter a valid phone number');
        }
        return Promise.resolve();
      },
    }]}
  >
    <CountryPhoneInput
      defaultCountry="BD"
      preferredCountries={['BD', 'US', 'GB']}
    />
  </Form.Item>
  <Button type="primary" htmlType="submit">Submit</Button>
</Form>`} />
            </Card>

            {/* Interactive Options */}
            <Card title="Interactive Options" size="small">
              <Space wrap style={{ marginBottom: 16 }}>
                <Space>
                  <Text>Search:</Text>
                  <Switch checked={enableSearch} onChange={setEnableSearch} />
                </Space>
                <Space>
                  <Text>Arrow:</Text>
                  <Switch checked={enableArrow} onChange={setEnableArrow} />
                </Space>
                <Space>
                  <Text>Disabled:</Text>
                  <Switch checked={disabled} onChange={setDisabled} />
                </Space>
                <Space>
                  <Text>Read Only:</Text>
                  <Switch checked={readOnly} onChange={setReadOnly} />
                </Space>
                <Space>
                  <Text>Size:</Text>
                  <Select
                    value={size}
                    onChange={setSize}
                    options={[
                      { label: 'Small', value: 'small' },
                      { label: 'Middle', value: 'middle' },
                      { label: 'Large', value: 'large' },
                    ]}
                    style={{ width: 100 }}
                  />
                </Space>
                <Space>
                  <Text>Status:</Text>
                  <Select
                    value={status}
                    onChange={setStatus}
                    allowClear
                    placeholder="None"
                    options={[
                      { label: 'Error', value: 'error' },
                      { label: 'Warning', value: 'warning' },
                    ]}
                    style={{ width: 100 }}
                  />
                </Space>
              </Space>

              <CountryPhoneInput
                defaultCountry="BD"
                enableSearch={enableSearch}
                enableArrow={enableArrow}
                disabled={disabled}
                readOnly={readOnly}
                size={size}
                status={status}
              />
            </Card>

            {/* Imperative Methods */}
            <Card title="Imperative Methods (Ref)" size="small">
              <Space direction="vertical" style={{ width: '100%' }} size="middle">
                <CountryPhoneInput
                  ref={phoneInputRef}
                  defaultCountry="JP"
                />
                <Space wrap>
                  <Button onClick={() => phoneInputRef.current?.focus()}>
                    Focus
                  </Button>
                  <Button onClick={() => phoneInputRef.current?.blur()}>
                    Blur
                  </Button>
                  <Button onClick={() => phoneInputRef.current?.clear()}>
                    Clear
                  </Button>
                  <Button onClick={() => phoneInputRef.current?.setCountry('FR')}>
                    Set France
                  </Button>
                  <Button
                    onClick={() => {
                      const value = phoneInputRef.current?.getValue();
                      message.info(`Current value: ${value?.fullNumber}`);
                    }}
                  >
                    Get Value
                  </Button>
                </Space>
              </Space>
              <CodeBlock code={`const phoneRef = useRef<CountryPhoneInputRef>(null);

<CountryPhoneInput ref={phoneRef} defaultCountry="JP" />

// Imperative methods
phoneRef.current?.focus();
phoneRef.current?.blur();
phoneRef.current?.clear();
phoneRef.current?.setCountry('FR');
const value = phoneRef.current?.getValue();`} />
            </Card>

            {/* Distinct Dial Codes */}
            <Card title="Distinct Dial Codes" size="small">
              <Paragraph type="secondary" style={{ marginBottom: 16 }}>
                Show only one country per dial code (e.g., only one +1 country).
              </Paragraph>
              <CountryPhoneInput
                defaultCountry="US"
                distinct
                preferredCountries={['US', 'GB', 'DE']}
              />
              <CodeBlock code={`<CountryPhoneInput
  defaultCountry="US"
  distinct
  preferredCountries={['US', 'GB', 'DE']}
/>`} />
            </Card>

            {/* Custom Container */}
            <Card
              title="Custom Popup Container"
              size="small"
              id="custom-container"
              style={{ position: 'relative' }}
            >
              <Paragraph type="secondary" style={{ marginBottom: 16 }}>
                The dropdown can be rendered in a custom container using getPopupContainer.
              </Paragraph>
              <CountryPhoneInput
                defaultCountry="AU"
                getPopupContainer={() =>
                  document.getElementById('custom-container') || document.body
                }
              />
              <CodeBlock code={`<CountryPhoneInput
  defaultCountry="AU"
  getPopupContainer={() =>
    document.getElementById('container') || document.body
  }
/>`} />
            </Card>

            {/* Controlled Dropdown */}
            <Card title="Controlled Dropdown (open prop)" size="small">
              <Paragraph type="secondary" style={{ marginBottom: 16 }}>
                Control dropdown visibility programmatically with the open prop.
              </Paragraph>
              <Space direction="vertical" style={{ width: '100%' }} size="middle">
                <Space>
                  <Button onClick={() => setDropdownOpen(true)}>Open Dropdown</Button>
                  <Button onClick={() => setDropdownOpen(false)}>Close Dropdown</Button>
                  <Text type="secondary">Current: {dropdownOpen ? 'Open' : 'Closed'}</Text>
                </Space>
                <CountryPhoneInput
                  defaultCountry="DE"
                  open={dropdownOpen}
                  onOpenChange={setDropdownOpen}
                />
              </Space>
              <CodeBlock code={`const [open, setOpen] = useState(false);

<CountryPhoneInput
  defaultCountry="DE"
  open={open}
  onOpenChange={setOpen}
/>

// Programmatically control dropdown
<Button onClick={() => setOpen(true)}>Open</Button>
<Button onClick={() => setOpen(false)}>Close</Button>`} />
            </Card>

            {/* Different Sizes Comparison */}
            <Card title="Size Comparison" size="small">
              <Space direction="vertical" style={{ width: '100%' }} size="middle">
                <div>
                  <Text type="secondary" style={{ display: 'block', marginBottom: 4 }}>
                    Small:
                  </Text>
                  <CountryPhoneInput defaultCountry="US" size="small" />
                </div>
                <div>
                  <Text type="secondary" style={{ display: 'block', marginBottom: 4 }}>
                    Middle (default):
                  </Text>
                  <CountryPhoneInput defaultCountry="US" size="middle" />
                </div>
                <div>
                  <Text type="secondary" style={{ display: 'block', marginBottom: 4 }}>
                    Large:
                  </Text>
                  <CountryPhoneInput defaultCountry="US" size="large" />
                </div>
              </Space>
            </Card>
          </Space>

          <Divider />

          <Paragraph type="secondary" style={{ textAlign: 'center' }}>
            CountryPhoneInput — A production-ready phone input for Ant Design
          </Paragraph>
        </div>
      </div>
    </ConfigProvider>
  );
}
