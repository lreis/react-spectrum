/*
 * Copyright 2020 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */

import {
  AriaLabelingProps,
  DOMProps,
  FocusableProps,
  HelpTextProps,
  InputBase,
  InputDOMProps,
  LabelableProps,
  RangeValue,
  SpectrumLabelableProps,
  StyleProps,
  Validation,
  ValueBase
} from '@react-types/shared';
import {CalendarDate, CalendarDateTime, Time, ZonedDateTime} from '@internationalized/date';
import {OverlayTriggerProps} from '@react-types/overlays';
import {PageBehavior} from '@react-types/calendar';

export type DateValue = CalendarDate | CalendarDateTime | ZonedDateTime;
type MappedDateValue<T> =
  T extends ZonedDateTime ? ZonedDateTime :
  T extends CalendarDateTime ? CalendarDateTime :
  T extends CalendarDate ? CalendarDate :
  never;

export type Granularity = 'day' | 'hour' | 'minute' | 'second';
interface DateFieldBase<T extends DateValue> extends InputBase, Validation, FocusableProps, LabelableProps, HelpTextProps, OverlayTriggerProps {
  /** The minimum allowed date that a user may select. */
  minValue?: DateValue,
  /** The maximum allowed date that a user may select. */
  maxValue?: DateValue,
  /** Callback that is called for each date of the calendar. If it returns true, then the date is unavailable. */
  isDateUnavailable?: (date: DateValue) => boolean,
  /** A placeholder date that influences the format of the placeholder shown when no value is selected. Defaults to today's date at midnight. */
  placeholderValue?: T,
  /** Whether to display the time in 12 or 24 hour format. By default, this is determined by the user's locale. */
  hourCycle?: 12 | 24,
  /** Determines the smallest unit that is displayed in the date picker. By default, this is `"day"` for dates, and `"minute"` for times. */
  granularity?: Granularity,
  /**
   * Whether to hide the time zone abbreviation.
   * @default false
   */
  hideTimeZone?: boolean,
  /**
   * Whether to always show leading zeros in the month, day, and hour fields.
   * By default, this is determined by the user's locale.
   */
  shouldForceLeadingZeros?: boolean
}

interface AriaDateFieldBaseProps<T extends DateValue> extends DateFieldBase<T>, AriaLabelingProps, DOMProps {}
export interface DateFieldProps<T extends DateValue> extends DateFieldBase<T>, ValueBase<T | null, MappedDateValue<T>> {}
export interface AriaDateFieldProps<T extends DateValue> extends DateFieldProps<T>, AriaDateFieldBaseProps<T>, InputDOMProps {}

interface DatePickerBase<T extends DateValue> extends DateFieldBase<T>, OverlayTriggerProps {
  /**
   * Controls the behavior of paging. Pagination either works by advancing the visible page by visibleDuration (default) or one unit of visibleDuration.
   * @default visible
   */
  pageBehavior?: PageBehavior
}
export interface AriaDatePickerBaseProps<T extends DateValue> extends DatePickerBase<T>, AriaLabelingProps, DOMProps {}

export interface DatePickerProps<T extends DateValue> extends DatePickerBase<T>, ValueBase<T | null, MappedDateValue<T>> {}
export interface AriaDatePickerProps<T extends DateValue> extends DatePickerProps<T>, AriaDatePickerBaseProps<T>, InputDOMProps {}

export type DateRange = RangeValue<DateValue>;
export interface DateRangePickerProps<T extends DateValue> extends DatePickerBase<T>, ValueBase<RangeValue<T> | null, RangeValue<MappedDateValue<T>>> {
  /**
   * When combined with `isDateUnavailable`, determines whether non-contiguous ranges,
   * i.e. ranges containing unavailable dates, may be selected.
   */
  allowsNonContiguousRanges?: boolean
}

export interface AriaDateRangePickerProps<T extends DateValue> extends AriaDatePickerBaseProps<T>, DateRangePickerProps<T> {
  /**
   * The name of the start date input element, used when submitting an HTML form. See [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#htmlattrdefname).
   */
  startName?: string,
  /**
   * The name of the end date input element, used when submitting an HTML form. See [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#htmlattrdefname).
   */
  endName?: string
}

interface SpectrumDateFieldBase extends SpectrumLabelableProps, HelpTextProps, StyleProps {
  /**
   * Whether the date picker should be displayed with a quiet style.
   * @default false
   */
  isQuiet?: boolean,
  /**
   * Whether to show the localized date format as help text below the field.
   * @default false
   */
  showFormatHelpText?: boolean
}

interface SpectrumDatePickerBase extends SpectrumDateFieldBase, SpectrumLabelableProps, StyleProps {
  /**
   * The maximum number of months to display at once in the calendar popover, if screen space permits.
   * @default 1
   */
  maxVisibleMonths?: number,
  /**
   * Whether the calendar popover should automatically flip direction when space is limited.
   * @default true
   */
  shouldFlip?: boolean
}

export interface SpectrumDatePickerProps<T extends DateValue> extends AriaDatePickerProps<T>, SpectrumDatePickerBase {}
export interface SpectrumDateRangePickerProps<T extends DateValue> extends AriaDateRangePickerProps<T>, SpectrumDatePickerBase {}
export interface SpectrumDateFieldProps<T extends DateValue> extends AriaDateFieldProps<T>, SpectrumDateFieldBase {}

export type TimeValue = Time | CalendarDateTime | ZonedDateTime;
type MappedTimeValue<T> =
  T extends ZonedDateTime ? ZonedDateTime :
  T extends CalendarDateTime ? CalendarDateTime :
  T extends Time ? Time :
  never;

export interface TimePickerProps<T extends TimeValue> extends InputBase, Validation, FocusableProps, LabelableProps, HelpTextProps, ValueBase<T | null, MappedTimeValue<T>> {
  /** Whether to display the time in 12 or 24 hour format. By default, this is determined by the user's locale. */
  hourCycle?: 12 | 24,
  /**
   * Determines the smallest unit that is displayed in the time picker.
   * @default 'minute'
   */
  granularity?: 'hour' | 'minute' | 'second',
  /** Whether to hide the time zone abbreviation. */
  hideTimeZone?: boolean,
  /**
   * Whether to always show leading zeros in the hour field.
   * By default, this is determined by the user's locale.
   */
  shouldForceLeadingZeros?: boolean,
  /**
   * A placeholder time that influences the format of the placeholder shown when no value is selected.
   * Defaults to 12:00 AM or 00:00 depending on the hour cycle.
   */
  placeholderValue?: T,
  /** The minimum allowed time that a user may select. */
  minValue?: TimeValue,
  /** The maximum allowed time that a user may select. */
  maxValue?: TimeValue
}

export interface AriaTimeFieldProps<T extends TimeValue> extends TimePickerProps<T>, AriaLabelingProps, DOMProps {}

export interface SpectrumTimeFieldProps<T extends TimeValue> extends AriaTimeFieldProps<T>, SpectrumLabelableProps, StyleProps {
  /**
   * Whether the time field should be displayed with a quiet style.
   * @default false
   */
  isQuiet?: boolean
}

// backward compatibility
export type SpectrumTimePickerProps<T extends TimeValue> = SpectrumTimeFieldProps<T>;
