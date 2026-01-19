import React, { forwardRef, useImperativeHandle, useRef, useState, useMemo, useCallback, useEffect } from 'react';
import { Input, Space, Select } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import { jsx, jsxs, Fragment } from 'react/jsx-runtime';

var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));

// src/countries.ts
var countries = [
  { name: "Afghanistan", iso2: "AF", dialCode: "93", format: "+.. .. ... ...." },
  { name: "Albania", iso2: "AL", dialCode: "355", format: "+... .. ... ...." },
  { name: "Algeria", iso2: "DZ", dialCode: "213", format: "+... .. ... ...." },
  { name: "American Samoa", iso2: "AS", dialCode: "1684", format: "+. (...) ...-...." },
  { name: "Andorra", iso2: "AD", dialCode: "376", format: "+... ... ..." },
  { name: "Angola", iso2: "AO", dialCode: "244", format: "+... ... ... ..." },
  { name: "Anguilla", iso2: "AI", dialCode: "1264", format: "+. (...) ...-...." },
  { name: "Antigua and Barbuda", iso2: "AG", dialCode: "1268", format: "+. (...) ...-...." },
  { name: "Argentina", iso2: "AR", dialCode: "54", format: "+.. .. ....-....." },
  { name: "Armenia", iso2: "AM", dialCode: "374", format: "+... .. ......" },
  { name: "Aruba", iso2: "AW", dialCode: "297", format: "+... ... ...." },
  { name: "Australia", iso2: "AU", dialCode: "61", format: "+.. ... ... ..." },
  { name: "Austria", iso2: "AT", dialCode: "43", format: "+.. ... ......." },
  { name: "Azerbaijan", iso2: "AZ", dialCode: "994", format: "+... .. ... .. .." },
  { name: "Bahamas", iso2: "BS", dialCode: "1242", format: "+. (...) ...-...." },
  { name: "Bahrain", iso2: "BH", dialCode: "973", format: "+... .... ...." },
  { name: "Bangladesh", iso2: "BD", dialCode: "880", format: "+... ....-......" },
  { name: "Barbados", iso2: "BB", dialCode: "1246", format: "+. (...) ...-...." },
  { name: "Belarus", iso2: "BY", dialCode: "375", format: "+... .. ... .. .." },
  { name: "Belgium", iso2: "BE", dialCode: "32", format: "+.. ... .. .. .." },
  { name: "Belize", iso2: "BZ", dialCode: "501", format: "+... ...-...." },
  { name: "Benin", iso2: "BJ", dialCode: "229", format: "+... .. .. .. .." },
  { name: "Bermuda", iso2: "BM", dialCode: "1441", format: "+. (...) ...-...." },
  { name: "Bhutan", iso2: "BT", dialCode: "975", format: "+... .. .. .. .." },
  { name: "Bolivia", iso2: "BO", dialCode: "591", format: "+... .-...-...." },
  { name: "Bosnia and Herzegovina", iso2: "BA", dialCode: "387", format: "+... .. ...-...." },
  { name: "Botswana", iso2: "BW", dialCode: "267", format: "+... .. ... ..." },
  { name: "Brazil", iso2: "BR", dialCode: "55", format: "+.. .. .....-....." },
  { name: "British Indian Ocean Territory", iso2: "IO", dialCode: "246", format: "+... ... ...." },
  { name: "British Virgin Islands", iso2: "VG", dialCode: "1284", format: "+. (...) ...-...." },
  { name: "Brunei", iso2: "BN", dialCode: "673", format: "+... ... ...." },
  { name: "Bulgaria", iso2: "BG", dialCode: "359", format: "+... . ... ...." },
  { name: "Burkina Faso", iso2: "BF", dialCode: "226", format: "+... .. .. .. .." },
  { name: "Burundi", iso2: "BI", dialCode: "257", format: "+... .. .. .. .." },
  { name: "Cambodia", iso2: "KH", dialCode: "855", format: "+... .. ... ..." },
  { name: "Cameroon", iso2: "CM", dialCode: "237", format: "+... .... ...." },
  { name: "Canada", iso2: "CA", dialCode: "1", priority: 1, format: "+. (...) ...-....", areaCodes: ["204", "226", "236", "249", "250", "289", "306", "343", "365", "387", "403", "416", "418", "431", "437", "438", "450", "506", "514", "519", "548", "579", "581", "587", "604", "613", "639", "647", "672", "705", "709", "742", "778", "780", "782", "807", "819", "825", "867", "873", "902", "905"] },
  { name: "Cape Verde", iso2: "CV", dialCode: "238", format: "+... ... .. .." },
  { name: "Caribbean Netherlands", iso2: "BQ", dialCode: "599", priority: 1, format: "+... ... ...." },
  { name: "Cayman Islands", iso2: "KY", dialCode: "1345", format: "+. (...) ...-...." },
  { name: "Central African Republic", iso2: "CF", dialCode: "236", format: "+... .. .. .. .." },
  { name: "Chad", iso2: "TD", dialCode: "235", format: "+... .. .. .. .." },
  { name: "Chile", iso2: "CL", dialCode: "56", format: "+.. . .... ...." },
  { name: "China", iso2: "CN", dialCode: "86", format: "+.. ... .... ...." },
  { name: "Christmas Island", iso2: "CX", dialCode: "61", priority: 2, format: "+.. . .... ...." },
  { name: "Cocos (Keeling) Islands", iso2: "CC", dialCode: "61", priority: 3, format: "+.. . .... ...." },
  { name: "Colombia", iso2: "CO", dialCode: "57", format: "+.. ... ... ...." },
  { name: "Comoros", iso2: "KM", dialCode: "269", format: "+... ... .. .." },
  { name: "Congo (DRC)", iso2: "CD", dialCode: "243", format: "+... .. ... ...." },
  { name: "Congo (Republic)", iso2: "CG", dialCode: "242", format: "+... .. ... ...." },
  { name: "Cook Islands", iso2: "CK", dialCode: "682", format: "+... .. ..." },
  { name: "Costa Rica", iso2: "CR", dialCode: "506", format: "+... ....-...." },
  { name: "Croatia", iso2: "HR", dialCode: "385", format: "+... .. ... ...." },
  { name: "Cuba", iso2: "CU", dialCode: "53", format: "+.. . ... ...." },
  { name: "Cura\xE7ao", iso2: "CW", dialCode: "599", priority: 0, format: "+... . ... ...." },
  { name: "Cyprus", iso2: "CY", dialCode: "357", format: "+... .. ......" },
  { name: "Czech Republic", iso2: "CZ", dialCode: "420", format: "+... ... ... ..." },
  { name: "Denmark", iso2: "DK", dialCode: "45", format: "+.. .. .. .. .." },
  { name: "Djibouti", iso2: "DJ", dialCode: "253", format: "+... .. .. .. .." },
  { name: "Dominica", iso2: "DM", dialCode: "1767", format: "+. (...) ...-...." },
  { name: "Dominican Republic", iso2: "DO", dialCode: "1", priority: 2, areaCodes: ["809", "829", "849"], format: "+. (...) ...-...." },
  { name: "Ecuador", iso2: "EC", dialCode: "593", format: "+... .. ... ...." },
  { name: "Egypt", iso2: "EG", dialCode: "20", format: "+.. ... ... ...." },
  { name: "El Salvador", iso2: "SV", dialCode: "503", format: "+... .... ...." },
  { name: "Equatorial Guinea", iso2: "GQ", dialCode: "240", format: "+... ... ... ..." },
  { name: "Eritrea", iso2: "ER", dialCode: "291", format: "+... . ... ..." },
  { name: "Estonia", iso2: "EE", dialCode: "372", format: "+... .... ...." },
  { name: "Eswatini", iso2: "SZ", dialCode: "268", format: "+... .... ...." },
  { name: "Ethiopia", iso2: "ET", dialCode: "251", format: "+... .. ... ...." },
  { name: "Falkland Islands", iso2: "FK", dialCode: "500", format: "+... ....." },
  { name: "Faroe Islands", iso2: "FO", dialCode: "298", format: "+... ......" },
  { name: "Fiji", iso2: "FJ", dialCode: "679", format: "+... ... ...." },
  { name: "Finland", iso2: "FI", dialCode: "358", format: "+... .. ... .. .." },
  { name: "France", iso2: "FR", dialCode: "33", format: "+.. . .. .. .. .." },
  { name: "French Guiana", iso2: "GF", dialCode: "594", format: "+... ... .. .. .." },
  { name: "French Polynesia", iso2: "PF", dialCode: "689", format: "+... .. .. .. .." },
  { name: "Gabon", iso2: "GA", dialCode: "241", format: "+... .. .. .. .." },
  { name: "Gambia", iso2: "GM", dialCode: "220", format: "+... ... ...." },
  { name: "Georgia", iso2: "GE", dialCode: "995", format: "+... ... ... ..." },
  { name: "Germany", iso2: "DE", dialCode: "49", format: "+.. ... ........" },
  { name: "Ghana", iso2: "GH", dialCode: "233", format: "+... .. ... ...." },
  { name: "Gibraltar", iso2: "GI", dialCode: "350", format: "+... ... ....." },
  { name: "Greece", iso2: "GR", dialCode: "30", format: "+.. ... ... ...." },
  { name: "Greenland", iso2: "GL", dialCode: "299", format: "+... .. .. .." },
  { name: "Grenada", iso2: "GD", dialCode: "1473", format: "+. (...) ...-...." },
  { name: "Guadeloupe", iso2: "GP", dialCode: "590", priority: 0, format: "+... ... .. .. .." },
  { name: "Guam", iso2: "GU", dialCode: "1671", format: "+. (...) ...-...." },
  { name: "Guatemala", iso2: "GT", dialCode: "502", format: "+... ....-...." },
  { name: "Guernsey", iso2: "GG", dialCode: "44", priority: 1, format: "+.. .... ......" },
  { name: "Guinea", iso2: "GN", dialCode: "224", format: "+... ... ... ..." },
  { name: "Guinea-Bissau", iso2: "GW", dialCode: "245", format: "+... ... ...." },
  { name: "Guyana", iso2: "GY", dialCode: "592", format: "+... ... ...." },
  { name: "Haiti", iso2: "HT", dialCode: "509", format: "+... .... ...." },
  { name: "Honduras", iso2: "HN", dialCode: "504", format: "+... ....-...." },
  { name: "Hong Kong", iso2: "HK", dialCode: "852", format: "+... .... ...." },
  { name: "Hungary", iso2: "HU", dialCode: "36", format: "+.. . ... ...." },
  { name: "Iceland", iso2: "IS", dialCode: "354", format: "+... ... ...." },
  { name: "India", iso2: "IN", dialCode: "91", format: "+.. ..... ....." },
  { name: "Indonesia", iso2: "ID", dialCode: "62", format: "+.. ...-...-..." },
  { name: "Iran", iso2: "IR", dialCode: "98", format: "+.. ... ... ...." },
  { name: "Iraq", iso2: "IQ", dialCode: "964", format: "+... ... ... ...." },
  { name: "Ireland", iso2: "IE", dialCode: "353", format: "+... .. ... ...." },
  { name: "Isle of Man", iso2: "IM", dialCode: "44", priority: 2, format: "+.. .... ......" },
  { name: "Israel", iso2: "IL", dialCode: "972", format: "+... .-...-....." },
  { name: "Italy", iso2: "IT", dialCode: "39", format: "+.. ... ... ...." },
  { name: "Ivory Coast", iso2: "CI", dialCode: "225", format: "+... .. .. .. .." },
  { name: "Jamaica", iso2: "JM", dialCode: "1876", format: "+. (...) ...-...." },
  { name: "Japan", iso2: "JP", dialCode: "81", format: "+.. .. .... ...." },
  { name: "Jersey", iso2: "JE", dialCode: "44", priority: 3, format: "+.. .... ......" },
  { name: "Jordan", iso2: "JO", dialCode: "962", format: "+... . .... ...." },
  { name: "Kazakhstan", iso2: "KZ", dialCode: "7", priority: 1, format: "+. ... ... .. .." },
  { name: "Kenya", iso2: "KE", dialCode: "254", format: "+... ... ......" },
  { name: "Kiribati", iso2: "KI", dialCode: "686", format: "+... .. ..." },
  { name: "Kosovo", iso2: "XK", dialCode: "383", format: "+... .. ... ..." },
  { name: "Kuwait", iso2: "KW", dialCode: "965", format: "+... .... ...." },
  { name: "Kyrgyzstan", iso2: "KG", dialCode: "996", format: "+... ... ... ..." },
  { name: "Laos", iso2: "LA", dialCode: "856", format: "+... .. .. ... ..." },
  { name: "Latvia", iso2: "LV", dialCode: "371", format: "+... .. ... ..." },
  { name: "Lebanon", iso2: "LB", dialCode: "961", format: "+... .. ... ..." },
  { name: "Lesotho", iso2: "LS", dialCode: "266", format: "+... .... ...." },
  { name: "Liberia", iso2: "LR", dialCode: "231", format: "+... ... ... ..." },
  { name: "Libya", iso2: "LY", dialCode: "218", format: "+... .. ... ...." },
  { name: "Liechtenstein", iso2: "LI", dialCode: "423", format: "+... ... ...." },
  { name: "Lithuania", iso2: "LT", dialCode: "370", format: "+... ... ....." },
  { name: "Luxembourg", iso2: "LU", dialCode: "352", format: "+... ... ... ..." },
  { name: "Macau", iso2: "MO", dialCode: "853", format: "+... .... ...." },
  { name: "Madagascar", iso2: "MG", dialCode: "261", format: "+... .. .. ... .." },
  { name: "Malawi", iso2: "MW", dialCode: "265", format: "+... ... ... ..." },
  { name: "Malaysia", iso2: "MY", dialCode: "60", format: "+.. ..-.... ...." },
  { name: "Maldives", iso2: "MV", dialCode: "960", format: "+... ... ...." },
  { name: "Mali", iso2: "ML", dialCode: "223", format: "+... .. .. .. .." },
  { name: "Malta", iso2: "MT", dialCode: "356", format: "+... .... ...." },
  { name: "Marshall Islands", iso2: "MH", dialCode: "692", format: "+... ... ...." },
  { name: "Martinique", iso2: "MQ", dialCode: "596", format: "+... ... .. .. .." },
  { name: "Mauritania", iso2: "MR", dialCode: "222", format: "+... .. .. .. .." },
  { name: "Mauritius", iso2: "MU", dialCode: "230", format: "+... .... ...." },
  { name: "Mayotte", iso2: "YT", dialCode: "262", priority: 1, format: "+... ... .. .. .." },
  { name: "Mexico", iso2: "MX", dialCode: "52", format: "+.. ... ... ...." },
  { name: "Micronesia", iso2: "FM", dialCode: "691", format: "+... ... ...." },
  { name: "Moldova", iso2: "MD", dialCode: "373", format: "+... .... ...." },
  { name: "Monaco", iso2: "MC", dialCode: "377", format: "+... .. ... ..." },
  { name: "Mongolia", iso2: "MN", dialCode: "976", format: "+... .... ...." },
  { name: "Montenegro", iso2: "ME", dialCode: "382", format: "+... .. ... ..." },
  { name: "Montserrat", iso2: "MS", dialCode: "1664", format: "+. (...) ...-...." },
  { name: "Morocco", iso2: "MA", dialCode: "212", format: "+... .-.. .. .. .." },
  { name: "Mozambique", iso2: "MZ", dialCode: "258", format: "+... .. ... ...." },
  { name: "Myanmar", iso2: "MM", dialCode: "95", format: "+.. ... ... ..." },
  { name: "Namibia", iso2: "NA", dialCode: "264", format: "+... .. ... ...." },
  { name: "Nauru", iso2: "NR", dialCode: "674", format: "+... ... ...." },
  { name: "Nepal", iso2: "NP", dialCode: "977", format: "+... .. .... ...." },
  { name: "Netherlands", iso2: "NL", dialCode: "31", format: "+.. . ........" },
  { name: "New Caledonia", iso2: "NC", dialCode: "687", format: "+... .. .. .." },
  { name: "New Zealand", iso2: "NZ", dialCode: "64", format: "+.. .. ... ...." },
  { name: "Nicaragua", iso2: "NI", dialCode: "505", format: "+... .... ...." },
  { name: "Niger", iso2: "NE", dialCode: "227", format: "+... .. .. .. .." },
  { name: "Nigeria", iso2: "NG", dialCode: "234", format: "+... ... ... ...." },
  { name: "Niue", iso2: "NU", dialCode: "683", format: "+... ...." },
  { name: "Norfolk Island", iso2: "NF", dialCode: "672", format: "+... .. ...." },
  { name: "North Korea", iso2: "KP", dialCode: "850", format: "+... ... ... ...." },
  { name: "North Macedonia", iso2: "MK", dialCode: "389", format: "+... .. ... ..." },
  { name: "Northern Mariana Islands", iso2: "MP", dialCode: "1670", format: "+. (...) ...-...." },
  { name: "Norway", iso2: "NO", dialCode: "47", format: "+.. ... .. ..." },
  { name: "Oman", iso2: "OM", dialCode: "968", format: "+... .... ...." },
  { name: "Pakistan", iso2: "PK", dialCode: "92", format: "+.. ... ......." },
  { name: "Palau", iso2: "PW", dialCode: "680", format: "+... ... ...." },
  { name: "Palestine", iso2: "PS", dialCode: "970", format: "+... ... ... ..." },
  { name: "Panama", iso2: "PA", dialCode: "507", format: "+... ....-...." },
  { name: "Papua New Guinea", iso2: "PG", dialCode: "675", format: "+... ... ...." },
  { name: "Paraguay", iso2: "PY", dialCode: "595", format: "+... ... ......" },
  { name: "Peru", iso2: "PE", dialCode: "51", format: "+.. ... ... ..." },
  { name: "Philippines", iso2: "PH", dialCode: "63", format: "+.. ... ... ...." },
  { name: "Poland", iso2: "PL", dialCode: "48", format: "+.. ... ... ..." },
  { name: "Portugal", iso2: "PT", dialCode: "351", format: "+... ... ... ..." },
  { name: "Puerto Rico", iso2: "PR", dialCode: "1", priority: 3, areaCodes: ["787", "939"], format: "+. (...) ...-...." },
  { name: "Qatar", iso2: "QA", dialCode: "974", format: "+... .... ...." },
  { name: "R\xE9union", iso2: "RE", dialCode: "262", priority: 0, format: "+... ... .. .. .." },
  { name: "Romania", iso2: "RO", dialCode: "40", format: "+.. ... ... ..." },
  { name: "Russia", iso2: "RU", dialCode: "7", priority: 0, format: "+. ... ... .. .." },
  { name: "Rwanda", iso2: "RW", dialCode: "250", format: "+... ... ... ..." },
  { name: "Saint Barth\xE9lemy", iso2: "BL", dialCode: "590", priority: 1, format: "+... ... .. .. .." },
  { name: "Saint Helena", iso2: "SH", dialCode: "290", format: "+... ...." },
  { name: "Saint Kitts and Nevis", iso2: "KN", dialCode: "1869", format: "+. (...) ...-...." },
  { name: "Saint Lucia", iso2: "LC", dialCode: "1758", format: "+. (...) ...-...." },
  { name: "Saint Martin", iso2: "MF", dialCode: "590", priority: 2, format: "+... ... .. .. .." },
  { name: "Saint Pierre and Miquelon", iso2: "PM", dialCode: "508", format: "+... .. .. .." },
  { name: "Saint Vincent and the Grenadines", iso2: "VC", dialCode: "1784", format: "+. (...) ...-...." },
  { name: "Samoa", iso2: "WS", dialCode: "685", format: "+... .. ...." },
  { name: "San Marino", iso2: "SM", dialCode: "378", format: "+... .... ......" },
  { name: "S\xE3o Tom\xE9 and Pr\xEDncipe", iso2: "ST", dialCode: "239", format: "+... ... ...." },
  { name: "Saudi Arabia", iso2: "SA", dialCode: "966", format: "+... .. ... ...." },
  { name: "Senegal", iso2: "SN", dialCode: "221", format: "+... .. ... .. .." },
  { name: "Serbia", iso2: "RS", dialCode: "381", format: "+... .. ... ...." },
  { name: "Seychelles", iso2: "SC", dialCode: "248", format: "+... . ... ..." },
  { name: "Sierra Leone", iso2: "SL", dialCode: "232", format: "+... .. ......" },
  { name: "Singapore", iso2: "SG", dialCode: "65", format: "+.. .... ...." },
  { name: "Sint Maarten", iso2: "SX", dialCode: "1721", format: "+. (...) ...-...." },
  { name: "Slovakia", iso2: "SK", dialCode: "421", format: "+... ... ... ..." },
  { name: "Slovenia", iso2: "SI", dialCode: "386", format: "+... .. ... ..." },
  { name: "Solomon Islands", iso2: "SB", dialCode: "677", format: "+... ....." },
  { name: "Somalia", iso2: "SO", dialCode: "252", format: "+... .. ... ..." },
  { name: "South Africa", iso2: "ZA", dialCode: "27", format: "+.. .. ... ...." },
  { name: "South Korea", iso2: "KR", dialCode: "82", format: "+.. .. .... ...." },
  { name: "South Sudan", iso2: "SS", dialCode: "211", format: "+... ... ... ..." },
  { name: "Spain", iso2: "ES", dialCode: "34", format: "+.. ... ... ..." },
  { name: "Sri Lanka", iso2: "LK", dialCode: "94", format: "+.. .. ... ...." },
  { name: "Sudan", iso2: "SD", dialCode: "249", format: "+... .. ... ...." },
  { name: "Suriname", iso2: "SR", dialCode: "597", format: "+... ... ..." },
  { name: "Svalbard and Jan Mayen", iso2: "SJ", dialCode: "47", priority: 1, format: "+.. ... .. ..." },
  { name: "Sweden", iso2: "SE", dialCode: "46", format: "+.. .. ... .. .." },
  { name: "Switzerland", iso2: "CH", dialCode: "41", format: "+.. .. ... .. .." },
  { name: "Syria", iso2: "SY", dialCode: "963", format: "+... ... ... ..." },
  { name: "Taiwan", iso2: "TW", dialCode: "886", format: "+... .... ...." },
  { name: "Tajikistan", iso2: "TJ", dialCode: "992", format: "+... .. ... ...." },
  { name: "Tanzania", iso2: "TZ", dialCode: "255", format: "+... .. ... ...." },
  { name: "Thailand", iso2: "TH", dialCode: "66", format: "+.. .. ... ...." },
  { name: "Timor-Leste", iso2: "TL", dialCode: "670", format: "+... ... ...." },
  { name: "Togo", iso2: "TG", dialCode: "228", format: "+... .. .. .. .." },
  { name: "Tokelau", iso2: "TK", dialCode: "690", format: "+... ...." },
  { name: "Tonga", iso2: "TO", dialCode: "676", format: "+... ....." },
  { name: "Trinidad and Tobago", iso2: "TT", dialCode: "1868", format: "+. (...) ...-...." },
  { name: "Tunisia", iso2: "TN", dialCode: "216", format: "+... .. ... ..." },
  { name: "Turkey", iso2: "TR", dialCode: "90", format: "+.. ... ... .. .." },
  { name: "Turkmenistan", iso2: "TM", dialCode: "993", format: "+... .. ......" },
  { name: "Turks and Caicos Islands", iso2: "TC", dialCode: "1649", format: "+. (...) ...-...." },
  { name: "Tuvalu", iso2: "TV", dialCode: "688", format: "+... ....." },
  { name: "Uganda", iso2: "UG", dialCode: "256", format: "+... ... ......" },
  { name: "Ukraine", iso2: "UA", dialCode: "380", format: "+... .. ... .. .." },
  { name: "United Arab Emirates", iso2: "AE", dialCode: "971", format: "+... .. ... ...." },
  { name: "United Kingdom", iso2: "GB", dialCode: "44", format: "+.. .... ......" },
  { name: "United States", iso2: "US", dialCode: "1", priority: 0, format: "+. (...) ...-....", areaCodes: ["201", "202", "203", "205", "206", "207", "208", "209", "210", "212", "213", "214", "215", "216", "217", "218", "219", "220", "224", "225", "228", "229", "231", "234", "239", "240", "248", "251", "252", "253", "254", "256", "260", "262", "267", "269", "270", "272", "276", "281", "283", "301", "302", "303", "304", "305", "307", "308", "309", "310", "312", "313", "314", "315", "316", "317", "318", "319", "320", "321", "323", "325", "330", "331", "334", "336", "337", "339", "346", "347", "351", "352", "360", "361", "364", "380", "385", "386", "401", "402", "404", "405", "406", "407", "408", "409", "410", "412", "413", "414", "415", "417", "419", "423", "424", "425", "430", "432", "434", "435", "440", "442", "443", "447", "458", "469", "470", "475", "478", "479", "480", "484", "501", "502", "503", "504", "505", "507", "508", "509", "510", "512", "513", "515", "516", "517", "518", "520", "530", "531", "534", "539", "540", "541", "551", "559", "561", "562", "563", "564", "567", "570", "571", "573", "574", "575", "580", "585", "586", "601", "602", "603", "605", "606", "607", "608", "609", "610", "612", "614", "615", "616", "617", "618", "619", "620", "623", "626", "628", "629", "630", "631", "636", "641", "646", "650", "651", "657", "660", "661", "662", "667", "669", "678", "680", "681", "682", "684", "689", "701", "702", "703", "704", "706", "707", "708", "712", "713", "714", "715", "716", "717", "718", "719", "720", "724", "725", "727", "731", "732", "734", "737", "740", "743", "747", "754", "757", "760", "762", "763", "765", "769", "770", "772", "773", "774", "775", "779", "781", "785", "786", "801", "802", "803", "804", "805", "806", "808", "810", "812", "813", "814", "815", "816", "817", "818", "828", "830", "831", "832", "843", "845", "847", "848", "850", "854", "856", "857", "858", "859", "860", "862", "863", "864", "865", "870", "872", "878", "901", "903", "904", "906", "907", "908", "909", "910", "912", "913", "914", "915", "916", "917", "918", "919", "920", "925", "928", "929", "930", "931", "934", "936", "937", "938", "940", "941", "947", "949", "951", "952", "954", "956", "959", "970", "971", "972", "973", "975", "978", "979", "980", "984", "985", "989"] },
  { name: "Uruguay", iso2: "UY", dialCode: "598", format: "+... .... ...." },
  { name: "US Virgin Islands", iso2: "VI", dialCode: "1340", format: "+. (...) ...-...." },
  { name: "Uzbekistan", iso2: "UZ", dialCode: "998", format: "+... .. ... .. .." },
  { name: "Vanuatu", iso2: "VU", dialCode: "678", format: "+... ....." },
  { name: "Vatican City", iso2: "VA", dialCode: "39", priority: 1, format: "+.. .. .... ...." },
  { name: "Venezuela", iso2: "VE", dialCode: "58", format: "+.. ...-......." },
  { name: "Vietnam", iso2: "VN", dialCode: "84", format: "+.. .. .... ..." },
  { name: "Wallis and Futuna", iso2: "WF", dialCode: "681", format: "+... .. .. .." },
  { name: "Western Sahara", iso2: "EH", dialCode: "212", priority: 1, format: "+... .. ... ...." },
  { name: "Yemen", iso2: "YE", dialCode: "967", format: "+... ... ... ..." },
  { name: "Zambia", iso2: "ZM", dialCode: "260", format: "+... .. ... ...." },
  { name: "Zimbabwe", iso2: "ZW", dialCode: "263", format: "+... .. ... ...." }
];
var countryByIso2 = new Map(
  countries.map((country) => [country.iso2.toUpperCase(), country])
);
var countriesByDialCode = /* @__PURE__ */ new Map();
countries.forEach((country) => {
  const existing = countriesByDialCode.get(country.dialCode) || [];
  existing.push(country);
  countriesByDialCode.set(country.dialCode, existing);
});
function getCountryByIso2(iso2) {
  return countryByIso2.get(iso2.toUpperCase());
}
function getCountriesByDialCode(dialCode) {
  const code = dialCode.replace(/^\+/, "");
  return countriesByDialCode.get(code) || [];
}
function getBestCountryForDialCode(dialCode) {
  const matches = getCountriesByDialCode(dialCode);
  if (matches.length === 0) return void 0;
  return matches.sort((a, b) => {
    var _a, _b;
    return ((_a = a.priority) != null ? _a : 0) - ((_b = b.priority) != null ? _b : 0);
  })[0];
}
function searchCountries(query, countryList = countries) {
  const normalizedQuery = query.toLowerCase().replace(/^\+/, "");
  return countryList.filter((country) => {
    const matchesName = country.name.toLowerCase().includes(normalizedQuery);
    const matchesIso2 = country.iso2.toLowerCase().includes(normalizedQuery);
    const matchesDialCode = country.dialCode.includes(normalizedQuery);
    return matchesName || matchesIso2 || matchesDialCode;
  });
}
var defaultCountry = countries.find((c) => c.iso2 === "US");

// src/utils.ts
function getFilteredCountries(options) {
  let result = [...countries];
  const { preferredCountries, onlyCountries, excludeCountries, distinct } = options;
  if (onlyCountries && onlyCountries.length > 0) {
    const onlySet = new Set(onlyCountries.map((c) => c.toUpperCase()));
    result = result.filter((country) => onlySet.has(country.iso2.toUpperCase()));
  }
  if (excludeCountries && excludeCountries.length > 0) {
    const excludeSet = new Set(excludeCountries.map((c) => c.toUpperCase()));
    result = result.filter((country) => !excludeSet.has(country.iso2.toUpperCase()));
  }
  if (distinct) {
    const seenDialCodes = /* @__PURE__ */ new Set();
    result = result.filter((country) => {
      if (seenDialCodes.has(country.dialCode)) {
        return false;
      }
      seenDialCodes.add(country.dialCode);
      return true;
    });
  }
  if (preferredCountries && preferredCountries.length > 0) {
    const preferredSet = new Set(preferredCountries.map((c) => c.toUpperCase()));
    const preferred = [];
    const others = [];
    result.forEach((country) => {
      if (preferredSet.has(country.iso2.toUpperCase())) {
        preferred.push(country);
      } else {
        others.push(country);
      }
    });
    preferred.sort((a, b) => {
      const aIndex = preferredCountries.findIndex(
        (c) => c.toUpperCase() === a.iso2.toUpperCase()
      );
      const bIndex = preferredCountries.findIndex(
        (c) => c.toUpperCase() === b.iso2.toUpperCase()
      );
      return aIndex - bIndex;
    });
    result = [...preferred, ...others];
  }
  return result;
}
function searchCountries2(query, countryList) {
  if (!query.trim()) return countryList;
  const normalizedQuery = query.toLowerCase().replace(/^\+/, "").trim();
  return countryList.filter((country) => {
    const matchesName = country.name.toLowerCase().includes(normalizedQuery);
    const matchesIso2 = country.iso2.toLowerCase() === normalizedQuery;
    const matchesDialCode = country.dialCode.includes(normalizedQuery);
    return matchesName || matchesIso2 || matchesDialCode;
  });
}
function getMaxPhoneLength(country) {
  if (!country.format) return 0;
  const formatParts = country.format.split(" ");
  const nationalParts = formatParts.slice(1).join(" ");
  const dotCount = (nationalParts.match(/\./g) || []).length;
  return dotCount;
}
var PHONE_LENGTH_OVERRIDES = {
  // US/Canada: 10 digits (area code + 7 digit number)
  "US": 10,
  "CA": 10,
  // UK: variable 10-11, use 10 as max for mobile
  "GB": 10,
  // India: 10 digits
  "IN": 10,
  // Bangladesh: 10 digits (excluding leading 0)
  "BD": 10,
  // Germany: variable 10-11
  "DE": 11,
  // Australia: 9 digits (mobile)
  "AU": 9,
  // China: 11 digits (mobile)
  "CN": 11,
  // Japan: 10 digits
  "JP": 10,
  // France: 9 digits
  "FR": 9
};
function getEffectiveMaxPhoneLength(country) {
  const override = PHONE_LENGTH_OVERRIDES[country.iso2.toUpperCase()];
  if (override) return override;
  return getMaxPhoneLength(country);
}
function resolveInitialCountry(defaultCountry2, defaultCode, defaultValue, fallbackIso2 = "US") {
  if (defaultCountry2) {
    const country = getCountryByIso2(defaultCountry2);
    if (country) return country;
  }
  if (defaultCode) {
    const country = getBestCountryForDialCode(defaultCode);
    if (country) return country;
  }
  if (defaultValue) {
    const country = guessCountryFromPhone(defaultValue);
    if (country) return country;
  }
  return getCountryByIso2(fallbackIso2) || countries[0];
}
function guessCountryFromPhone(phone) {
  const cleaned = phone.replace(/[^\d+]/g, "");
  const digits = cleaned.replace(/^\+/, "");
  for (let len = Math.min(4, digits.length); len >= 1; len--) {
    const potentialCode = digits.slice(0, len);
    const country = getBestCountryForDialCode(potentialCode);
    if (country) return country;
  }
  return void 0;
}
function formatDialCode(dialCode) {
  const cleaned = dialCode.replace(/^\+/, "");
  return `+${cleaned}`;
}
function getProtectedPrefixLength(dialCode) {
  return formatDialCode(dialCode).length + 1;
}
function buildInputValue(country, phoneDigits = "") {
  const dialCode = formatDialCode(country.dialCode);
  const cleanDigits = phoneDigits.replace(/\D/g, "");
  return cleanDigits ? `${dialCode} ${cleanDigits}` : `${dialCode} `;
}
function extractPhoneDigits(inputValue, dialCode) {
  const prefix = formatDialCode(dialCode) + " ";
  if (inputValue.startsWith(prefix)) {
    return inputValue.slice(prefix.length).replace(/\D/g, "");
  }
  return inputValue.replace(formatDialCode(dialCode), "").replace(/\D/g, "");
}
function buildPhoneValue(inputValue, country) {
  if (!country) {
    return {
      fullNumber: inputValue,
      phoneNumber: "",
      dialCode: "",
      rawDialCode: "",
      countryCode: "",
      country: null,
      isValid: false
    };
  }
  const phoneDigits = extractPhoneDigits(inputValue, country.dialCode);
  const dialCode = formatDialCode(country.dialCode);
  const fullNumber = phoneDigits ? `${dialCode}${phoneDigits}` : dialCode;
  return {
    fullNumber,
    phoneNumber: phoneDigits,
    dialCode,
    rawDialCode: country.dialCode,
    countryCode: country.iso2,
    country,
    isValid: phoneDigits.length >= 4
    // Basic validation
  };
}
function isProtectedAction(event, inputElement, protectedLength) {
  const { key, ctrlKey, metaKey } = event;
  const { selectionStart, selectionEnd, value } = inputElement;
  if (["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown", "Home", "End", "Tab"].includes(key)) {
    return false;
  }
  if ((ctrlKey || metaKey) && key.toLowerCase() === "c") {
    return false;
  }
  if (selectionStart === 0 && selectionEnd === value.length) {
    if (key === "Backspace" || key === "Delete") {
      return true;
    }
  }
  if (key === "Backspace") {
    if (selectionStart !== null && selectionStart <= protectedLength) {
      if (selectionStart === selectionEnd) {
        return true;
      }
      if (selectionStart < protectedLength) {
        return true;
      }
    }
  }
  if (key === "Delete") {
    if (selectionStart !== null && selectionStart < protectedLength) {
      return true;
    }
  }
  if ((ctrlKey || metaKey) && key.toLowerCase() === "x") {
    if (selectionStart !== null && selectionStart < protectedLength) {
      return true;
    }
  }
  return false;
}
function normalizeInputValue(value, country, previousValue) {
  const expectedPrefix = formatDialCode(country.dialCode) + " ";
  if (value.startsWith(expectedPrefix)) {
    return value;
  }
  if (!value.trim()) {
    return expectedPrefix;
  }
  if (value.startsWith("+")) {
    const withoutPlus = value.slice(1);
    const dialCodeDigits = country.dialCode;
    if (withoutPlus.startsWith(dialCodeDigits)) {
      const rest = withoutPlus.slice(dialCodeDigits.length).replace(/^\s+/, "");
      return expectedPrefix + rest;
    }
  }
  const previousDigits = extractPhoneDigits(previousValue, country.dialCode);
  const newDigits = value.replace(/\D/g, "");
  const dialCodeLen = country.dialCode.length;
  if (newDigits.startsWith(country.dialCode)) {
    return expectedPrefix + newDigits.slice(dialCodeLen);
  }
  return expectedPrefix + previousDigits;
}
function sanitizePastedValue(pastedText, currentValue, selectionStart, selectionEnd, country) {
  const protectedLength = getProtectedPrefixLength(country.dialCode);
  const expectedPrefix = formatDialCode(country.dialCode) + " ";
  const pastedDigits = pastedText.replace(/\D/g, "");
  if (selectionStart < protectedLength) {
    const currentDigits = extractPhoneDigits(currentValue, country.dialCode);
    return expectedPrefix + currentDigits + pastedDigits;
  }
  const beforeSelection = currentValue.slice(0, selectionStart);
  const afterSelection = currentValue.slice(selectionEnd);
  return beforeSelection + pastedDigits + afterSelection;
}
var DEFAULT_FLAG_CDN = "https://flagcdn.com";
function getFlagUrl(iso2, useSVG = true, customBaseUrl) {
  const baseUrl = customBaseUrl || DEFAULT_FLAG_CDN;
  const code = iso2.toLowerCase();
  if (useSVG) {
    return `${baseUrl}/${code}.svg`;
  }
  return `${baseUrl}/w40/${code}.png`;
}
function getFlagEmoji(iso2) {
  const codePoints = iso2.toUpperCase().split("").map((char) => 127397 + char.charCodeAt(0));
  return String.fromCodePoint(...codePoints);
}

// src/usePhoneInput.ts
function usePhoneInput(options) {
  const {
    value: controlledValue,
    defaultValue,
    defaultCountry: defaultCountry2,
    defaultCode,
    preferredCountries,
    onlyCountries,
    excludeCountries,
    distinct,
    onChange,
    onCountryChange,
    disabled,
    readOnly
  } = options;
  const isControlled = controlledValue !== void 0;
  const filteredCountries = useMemo(
    () => getFilteredCountries({
      preferredCountries,
      onlyCountries,
      excludeCountries,
      distinct
    }),
    [preferredCountries, onlyCountries, excludeCountries, distinct]
  );
  const initialCountry = useMemo(() => {
    const resolved = resolveInitialCountry(
      defaultCountry2,
      defaultCode,
      defaultValue || controlledValue,
      "US"
    );
    const inFiltered = filteredCountries.find(
      (c) => c.iso2.toUpperCase() === resolved.iso2.toUpperCase()
    );
    return inFiltered || filteredCountries[0] || resolved;
  }, [defaultCountry2, defaultCode, defaultValue, controlledValue, filteredCountries]);
  const [state, setState] = useState(() => {
    const country = initialCountry;
    const initialValue = controlledValue || defaultValue;
    let inputValue;
    if (initialValue) {
      const phoneDigits = extractPhoneDigits(initialValue, country.dialCode);
      inputValue = buildInputValue(country, phoneDigits);
    } else {
      inputValue = buildInputValue(country, "");
    }
    return {
      country,
      inputValue,
      cursorPosition: null
    };
  });
  const inputRef = useRef(null);
  const previousValueRef = useRef(state.inputValue);
  const isInternalChangeRef = useRef(false);
  const prevControlledValueRef = useRef(controlledValue);
  useEffect(() => {
    if (isControlled && controlledValue !== prevControlledValueRef.current && !isInternalChangeRef.current) {
      prevControlledValueRef.current = controlledValue;
      const phoneDigits = extractPhoneDigits(controlledValue || "", state.country.dialCode);
      const maxLength = getMaxPhoneLength(state.country);
      const limitedDigits = maxLength > 0 ? phoneDigits.slice(0, maxLength) : phoneDigits;
      const newInputValue = buildInputValue(state.country, limitedDigits);
      if (newInputValue !== state.inputValue) {
        queueMicrotask(() => {
          setState((prev) => __spreadProps(__spreadValues({}, prev), {
            inputValue: newInputValue
          }));
        });
      }
    }
    isInternalChangeRef.current = false;
  }, [controlledValue, isControlled, state.country, state.inputValue]);
  useEffect(() => {
    if (state.cursorPosition !== null && inputRef.current) {
      const pos = Math.max(
        state.cursorPosition,
        getProtectedPrefixLength(state.country.dialCode)
      );
      inputRef.current.setSelectionRange(pos, pos);
    }
  }, [state.cursorPosition, state.country.dialCode]);
  const getPhoneValue = useCallback(() => {
    return buildPhoneValue(state.inputValue, state.country);
  }, [state.inputValue, state.country]);
  const handleCountryChange = useCallback(
    (iso2) => {
      if (disabled || readOnly) return;
      const newCountry = filteredCountries.find(
        (c) => c.iso2.toUpperCase() === iso2.toUpperCase()
      );
      if (!newCountry || newCountry.iso2 === state.country.iso2) return;
      const currentDigits = extractPhoneDigits(state.inputValue, state.country.dialCode);
      const newMaxLength = getMaxPhoneLength(newCountry);
      const trimmedDigits = newMaxLength > 0 ? currentDigits.slice(0, newMaxLength) : currentDigits;
      const newInputValue = buildInputValue(newCountry, trimmedDigits);
      isInternalChangeRef.current = true;
      setState((prev) => __spreadProps(__spreadValues({}, prev), {
        country: newCountry,
        inputValue: newInputValue,
        cursorPosition: newInputValue.length
      }));
      previousValueRef.current = newInputValue;
      onCountryChange == null ? void 0 : onCountryChange(newCountry);
      const phoneValue = buildPhoneValue(newInputValue, newCountry);
      onChange == null ? void 0 : onChange(phoneValue);
    },
    [
      disabled,
      readOnly,
      filteredCountries,
      state.country,
      state.inputValue,
      onChange,
      onCountryChange
    ]
  );
  const handleInputChange = useCallback(
    (e) => {
      if (disabled || readOnly) return;
      const newValue = e.target.value;
      const protectedLength = getProtectedPrefixLength(state.country.dialCode);
      let normalizedValue = normalizeInputValue(
        newValue,
        state.country,
        previousValueRef.current
      );
      const maxLength = getMaxPhoneLength(state.country);
      if (maxLength > 0) {
        const digits = extractPhoneDigits(normalizedValue, state.country.dialCode);
        if (digits.length > maxLength) {
          const trimmedDigits = digits.slice(0, maxLength);
          normalizedValue = buildInputValue(state.country, trimmedDigits);
        }
      }
      let cursorPos = e.target.selectionStart || normalizedValue.length;
      if (cursorPos < protectedLength) {
        cursorPos = protectedLength;
      }
      if (cursorPos > normalizedValue.length) {
        cursorPos = normalizedValue.length;
      }
      isInternalChangeRef.current = true;
      setState((prev) => __spreadProps(__spreadValues({}, prev), {
        inputValue: normalizedValue,
        cursorPosition: cursorPos
      }));
      previousValueRef.current = normalizedValue;
      const phoneValue = buildPhoneValue(normalizedValue, state.country);
      onChange == null ? void 0 : onChange(phoneValue);
    },
    [disabled, readOnly, state.country, onChange]
  );
  const handleKeyDown = useCallback(
    (e) => {
      if (disabled || readOnly) return;
      const inputElement = e.currentTarget;
      const protectedLength = getProtectedPrefixLength(state.country.dialCode);
      if (isProtectedAction(e, inputElement, protectedLength)) {
        e.preventDefault();
        return;
      }
      if (e.key === "Home" && !e.shiftKey) {
        e.preventDefault();
        inputElement.setSelectionRange(protectedLength, protectedLength);
        return;
      }
      if (e.key === "Home" && e.shiftKey) {
        e.preventDefault();
        const currentEnd = inputElement.selectionEnd || protectedLength;
        inputElement.setSelectionRange(protectedLength, currentEnd);
        return;
      }
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "a") {
        e.preventDefault();
        inputElement.setSelectionRange(protectedLength, inputElement.value.length);
        return;
      }
    },
    [disabled, readOnly, state.country.dialCode]
  );
  const handlePaste = useCallback(
    (e) => {
      if (disabled || readOnly) return;
      e.preventDefault();
      const pastedText = e.clipboardData.getData("text");
      const inputElement = e.currentTarget;
      const selectionStart = inputElement.selectionStart || 0;
      const selectionEnd = inputElement.selectionEnd || 0;
      let newValue = sanitizePastedValue(
        pastedText,
        state.inputValue,
        selectionStart,
        selectionEnd,
        state.country
      );
      const maxLength = getMaxPhoneLength(state.country);
      if (maxLength > 0) {
        const digits = extractPhoneDigits(newValue, state.country.dialCode);
        if (digits.length > maxLength) {
          const trimmedDigits = digits.slice(0, maxLength);
          newValue = buildInputValue(state.country, trimmedDigits);
        }
      }
      const protectedLength = getProtectedPrefixLength(state.country.dialCode);
      let newCursorPos;
      if (selectionStart < protectedLength) {
        newCursorPos = newValue.length;
      } else {
        const pastedDigits = pastedText.replace(/\D/g, "");
        newCursorPos = Math.min(selectionStart + pastedDigits.length, newValue.length);
      }
      isInternalChangeRef.current = true;
      setState((prev) => __spreadProps(__spreadValues({}, prev), {
        inputValue: newValue,
        cursorPosition: newCursorPos
      }));
      previousValueRef.current = newValue;
      const phoneValue = buildPhoneValue(newValue, state.country);
      onChange == null ? void 0 : onChange(phoneValue);
    },
    [disabled, readOnly, state.inputValue, state.country, onChange]
  );
  const handleSelect = useCallback(
    (e) => {
      const inputElement = e.currentTarget;
      const protectedLength = getProtectedPrefixLength(state.country.dialCode);
      const { selectionStart, selectionEnd } = inputElement;
      if (selectionStart !== null && selectionStart < protectedLength) {
        if (selectionStart === selectionEnd) {
          inputElement.setSelectionRange(protectedLength, protectedLength);
        } else if (selectionEnd !== null && selectionEnd > protectedLength) {
          inputElement.setSelectionRange(protectedLength, selectionEnd);
        }
      }
    },
    [state.country.dialCode]
  );
  const handleFocus = useCallback(
    (e) => {
      const inputElement = e.currentTarget;
      const protectedLength = getProtectedPrefixLength(state.country.dialCode);
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
  const handleClick = useCallback(
    (e) => {
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
  const focus = useCallback(() => {
    var _a;
    (_a = inputRef.current) == null ? void 0 : _a.focus();
  }, []);
  const blur = useCallback(() => {
    var _a;
    (_a = inputRef.current) == null ? void 0 : _a.blur();
  }, []);
  const clear = useCallback(() => {
    if (disabled || readOnly) return;
    const newInputValue = buildInputValue(state.country, "");
    isInternalChangeRef.current = true;
    setState((prev) => __spreadProps(__spreadValues({}, prev), {
      inputValue: newInputValue,
      cursorPosition: getProtectedPrefixLength(state.country.dialCode)
    }));
    previousValueRef.current = newInputValue;
    const phoneValue = buildPhoneValue(newInputValue, state.country);
    onChange == null ? void 0 : onChange(phoneValue);
  }, [disabled, readOnly, state.country, onChange]);
  const setCountry = useCallback(
    (iso2) => {
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
    getPhoneValue
  };
}

// src/CountryPhoneInput.module.css
var CountryPhoneInput_default = {};
var CountryFlag = React.memo(({ iso2, useSVG = true, flagUrl, size = 20 }) => {
  const [error, setError] = React.useState(false);
  if (error) {
    return /* @__PURE__ */ jsx("span", { className: CountryPhoneInput_default.flagEmoji, style: { fontSize: size }, children: getFlagEmoji(iso2) });
  }
  return (
    // eslint-disable-next-line @next/next/no-img-element
    /* @__PURE__ */ jsx(
      "img",
      {
        src: getFlagUrl(iso2, useSVG, flagUrl),
        alt: `${iso2} flag`,
        className: CountryPhoneInput_default.flagImage,
        style: { width: size, height: Math.round(size * 0.75) },
        onError: () => setError(true),
        loading: "lazy"
      }
    )
  );
});
CountryFlag.displayName = "CountryFlag";
var CountryOption = React.memo(({ country, useSVG, flagUrl }) => {
  return /* @__PURE__ */ jsxs("div", { className: CountryPhoneInput_default.countryOption, children: [
    /* @__PURE__ */ jsx(CountryFlag, { iso2: country.iso2, useSVG, flagUrl }),
    /* @__PURE__ */ jsx("span", { className: CountryPhoneInput_default.countryName, children: country.name }),
    /* @__PURE__ */ jsxs("span", { className: CountryPhoneInput_default.dialCode, children: [
      "+",
      country.dialCode
    ] })
  ] });
});
CountryOption.displayName = "CountryOption";
var SelectedCountry = React.memo(({ country, useSVG, flagUrl }) => {
  return /* @__PURE__ */ jsx("div", { className: CountryPhoneInput_default.selectedCountry, children: /* @__PURE__ */ jsx(CountryFlag, { iso2: country.iso2, useSVG, flagUrl, size: 18 }) });
});
SelectedCountry.displayName = "SelectedCountry";
var CountryPhoneInput = forwardRef(
  (props, ref) => {
    const {
      // Value props
      value,
      defaultValue,
      defaultCountry: defaultCountry2,
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
      searchIcon,
      searchPlaceholder = "Search country",
      searchNotFound = "No country found",
      enableArrow = true,
      dropdownIcon,
      disableDropdown = false,
      popupRender,
      getPopupContainer,
      // Display config
      useSVG = true,
      flagUrl,
      // Passthrough props
      selectProps,
      inputProps,
      // Styling
      className,
      selectClassName,
      inputClassName,
      style,
      size = "middle",
      disabled = false,
      readOnly = false,
      placeholder = "Phone number",
      variant = "outlined",
      status
    } = props;
    const {
      state,
      filteredCountries,
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
      getPhoneValue
    } = usePhoneInput({
      value,
      defaultValue,
      defaultCountry: defaultCountry2,
      defaultCode,
      preferredCountries,
      onlyCountries,
      excludeCountries,
      distinct,
      onChange,
      onCountryChange,
      disabled,
      readOnly
    });
    useImperativeHandle(
      ref,
      () => ({
        focus,
        blur,
        getValue: getPhoneValue,
        setCountry,
        clear,
        getInputElement: () => {
          var _a, _b;
          return (_b = (_a = antdInputRef.current) == null ? void 0 : _a.input) != null ? _b : null;
        }
      }),
      [focus, blur, getPhoneValue, setCountry, clear]
    );
    const antdInputRef = useRef(null);
    const [searchQuery, setSearchQuery] = useState("");
    const displayedCountries = useMemo(() => {
      if (!searchQuery.trim()) return filteredCountries;
      const query = searchQuery.toLowerCase().replace(/^\+/, "");
      return filteredCountries.filter((country) => {
        return country.name.toLowerCase().includes(query) || country.iso2.toLowerCase().includes(query) || country.dialCode.includes(query);
      });
    }, [filteredCountries, searchQuery]);
    const selectOptions = useMemo(() => {
      return displayedCountries.map((country) => ({
        value: country.iso2,
        label: /* @__PURE__ */ jsx(CountryOption, { country, useSVG, flagUrl })
      }));
    }, [displayedCountries, useSVG, flagUrl]);
    const onSelectChange = useCallback(
      (iso2) => {
        handleCountryChange(iso2);
        setSearchQuery("");
      },
      [handleCountryChange]
    );
    const customDropdownRender = useCallback(
      (menu) => /* @__PURE__ */ jsxs(Fragment, { children: [
        enableSearch && /* @__PURE__ */ jsx("div", { style: { padding: "8px" }, children: /* @__PURE__ */ jsx(
          Input,
          {
            placeholder: searchPlaceholder,
            value: searchQuery,
            onChange: (e) => setSearchQuery(e.target.value),
            prefix: searchIcon || /* @__PURE__ */ jsxs(
              "svg",
              {
                width: "14",
                height: "14",
                viewBox: "0 0 24 24",
                fill: "none",
                stroke: "currentColor",
                strokeWidth: "2",
                strokeLinecap: "round",
                strokeLinejoin: "round",
                style: { opacity: 0.45 },
                children: [
                  /* @__PURE__ */ jsx("circle", { cx: "11", cy: "11", r: "8" }),
                  /* @__PURE__ */ jsx("path", { d: "m21 21-4.35-4.35" })
                ]
              }
            ),
            style: { marginBottom: "8px" },
            allowClear: true
          }
        ) }),
        displayedCountries.length === 0 ? /* @__PURE__ */ jsx("div", { style: { padding: "8px 12px", color: "#999", textAlign: "center" }, children: searchNotFound }) : menu
      ] }),
      [enableSearch, searchPlaceholder, searchQuery, searchIcon, displayedCountries.length, searchNotFound]
    );
    const suffixIcon = useMemo(() => {
      if (!enableArrow) return null;
      if (dropdownIcon) return dropdownIcon;
      return /* @__PURE__ */ jsx(DownOutlined, { className: CountryPhoneInput_default.arrowIcon });
    }, [enableArrow, dropdownIcon]);
    const sizeClass = useMemo(() => {
      switch (size) {
        case "small":
          return CountryPhoneInput_default.sizeSmall;
        case "large":
          return CountryPhoneInput_default.sizeLarge;
        default:
          return CountryPhoneInput_default.sizeMiddle;
      }
    }, [size]);
    const wrapperClassName = useMemo(() => {
      return [
        CountryPhoneInput_default.wrapper,
        sizeClass,
        disabled && CountryPhoneInput_default.disabled,
        readOnly && CountryPhoneInput_default.readOnly,
        status === "error" && CountryPhoneInput_default.error,
        status === "warning" && CountryPhoneInput_default.warning,
        className
      ].filter(Boolean).join(" ");
    }, [sizeClass, disabled, readOnly, status, className]);
    return /* @__PURE__ */ jsx("div", { className: wrapperClassName, style, children: /* @__PURE__ */ jsxs(Space.Compact, { block: true, className: CountryPhoneInput_default.inputGroup, children: [
      /* @__PURE__ */ jsx(
        Select,
        __spreadProps(__spreadValues({}, selectProps), {
          className: `${CountryPhoneInput_default.countrySelect} ${selectClassName || ""}`,
          value: state.country.iso2,
          onChange: onSelectChange,
          options: selectOptions,
          showSearch: false,
          optionLabelProp: "label",
          suffixIcon,
          disabled: disabled || disableDropdown,
          size,
          variant,
          status,
          popupRender: popupRender || customDropdownRender,
          getPopupContainer,
          popupMatchSelectWidth: 280,
          labelRender: () => /* @__PURE__ */ jsx(
            SelectedCountry,
            {
              country: state.country,
              useSVG,
              flagUrl
            }
          )
        })
      ),
      /* @__PURE__ */ jsx(
        Input,
        __spreadProps(__spreadValues({}, inputProps), {
          ref: antdInputRef,
          className: `${CountryPhoneInput_default.phoneInput} ${inputClassName || ""}`,
          value: state.inputValue,
          onChange: handleInputChange,
          onKeyDown: handleKeyDown,
          onPaste: handlePaste,
          onSelect: handleSelect,
          onFocus: handleFocus,
          onClick: handleClick,
          placeholder,
          disabled,
          readOnly,
          size,
          variant,
          status
        })
      )
    ] }) });
  }
);
CountryPhoneInput.displayName = "CountryPhoneInput";
var CountryPhoneInput_default2 = CountryPhoneInput;

export { CountryPhoneInput_default2 as CountryPhoneInput, DEFAULT_FLAG_CDN, buildInputValue, buildPhoneValue, countries, CountryPhoneInput_default2 as default, defaultCountry, extractPhoneDigits, formatDialCode, getBestCountryForDialCode, getCountriesByDialCode, getCountryByIso2, getEffectiveMaxPhoneLength, getFilteredCountries, getFlagEmoji, getFlagUrl, getMaxPhoneLength, getProtectedPrefixLength, guessCountryFromPhone, resolveInitialCountry, searchCountries2 as searchCountries, searchCountries as searchCountriesData, usePhoneInput };
//# sourceMappingURL=index.mjs.map
//# sourceMappingURL=index.mjs.map