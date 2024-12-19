import { useState, useEffect } from 'react'
import { DateRange } from 'react-date-range'
import { addDays, isBefore, isWithinInterval, format } from 'date-fns'
import { enUS } from 'date-fns/locale'
import ErrorBoundary from './ErrorBoundary'
import 'react-date-range/dist/styles.css'
import 'react-date-range/dist/theme/default.css'
import '../styles/calendar.css'

const Calendar = ({ 
  onDateChange, 
  bookedDates = [], 
  minDays = 1, 
  maxDays = 30,
  initialStartDate = new Date(),
  initialEndDate = addDays(new Date(), 1)
}) => {
  const [dateRange, setDateRange] = useState([
    {
      startDate: initialStartDate,
      endDate: initialEndDate,
      key: 'selection'
    }
  ])

  // Convert booked dates strings to Date objects
  const bookedDateRanges = bookedDates.map(range => ({
    start: new Date(range.start),
    end: new Date(range.end)
  }))

  // Check if a date is within any of the booked ranges
  const isDateBooked = (date) => {
    return bookedDateRanges.some(range =>
      isWithinInterval(date, { start: range.start, end: range.end })
    )
  }

  // Disable dates that are booked or in the past
  const disableDate = (date) => {
    return isBefore(date, new Date()) || isDateBooked(date)
  }

  const handleRangeChange = (ranges) => {
    const { selection } = ranges
    // Ensure minimum stay
    if (selection.startDate && selection.endDate) {
      const days = Math.ceil((selection.endDate - selection.startDate) / (1000 * 60 * 60 * 24))
      if (days < minDays) {
        selection.endDate = addDays(selection.startDate, minDays - 1)
      } else if (days > maxDays) {
        selection.endDate = addDays(selection.startDate, maxDays - 1)
      }
    }
    setDateRange([selection])
    if (onDateChange) {
      onDateChange(selection)
    }
  }

  return (
    <div className="bg-deep-brown/50 backdrop-blur-md rounded-lg p-4">
      <DateRange
        onChange={handleRangeChange}
        moveRangeOnFirstSelection={false}
        ranges={dateRange}
        minDate={new Date()}
        maxDate={addDays(new Date(), 365)}
        disabledDay={disableDate}
        rangeColors={['#8B4513']}
        color="#8B4513"
        months={1}
        direction="vertical"
        locale={enUS}
        showMonthAndYearPickers={false}
        showDateDisplay={false}
        className="calendar-custom"
      />
      <div className="mt-4 space-y-2">
        <div className="flex items-center gap-2 text-warm-beige/80">
          <div className="w-4 h-4 bg-[#F5E6D3] rounded"></div>
          <span>Available</span>
        </div>
        <div className="flex items-center gap-2 text-warm-beige/80">
          <div className="w-4 h-4 bg-red-800 rounded"></div>
          <span>Unavailable</span>
        </div>
        <div className="flex items-center gap-2 text-warm-beige/80">
          <div className="w-4 h-4 bg-[#8B4513] rounded"></div>
          <span>Selected</span>
        </div>
        <div className="text-warm-beige/60 text-sm">
          {minDays === maxDays 
            ? `Stay duration: ${minDays} night${minDays > 1 ? 's' : ''}`
            : `Minimum stay: ${minDays} night${minDays > 1 ? 's' : ''}`
          }
        </div>
      </div>
    </div>
  )
}

const AvailabilityCalendar = (props) => {
  return (
    <ErrorBoundary
      fallback="Unable to load the calendar. Please try refreshing the page."
      showHome={false}
    >
      <Calendar {...props} />
    </ErrorBoundary>
  )
}

export default AvailabilityCalendar
