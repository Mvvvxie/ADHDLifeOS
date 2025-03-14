import React from 'react';
import styled from '@emotion/styled';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { useStore } from '../../../store/useStore';
import { CalendarEvent, TimeBlock, Milestone } from '../../../types';

const CalendarContainer = styled.div`
  background: #1a1a1a;
  border-radius: 8px;
  padding: 20px;
  height: calc(100vh - 120px);
  
  .fc {
    height: 100%;
  }
  
  .fc-theme-standard {
    background: #1a1a1a;
    color: #ffffff;
  }
  
  .fc-theme-standard td, .fc-theme-standard th {
    border-color: #333333;
  }
  
  .fc-day-today {
    background: #2a2a2a !important;
  }
  
  .fc-button {
    background: #333333;
    border: none;
    
    &:hover {
      background: #444444;
    }
    
    &:disabled {
      background: #222222;
    }
  }
  
  .fc-event {
    cursor: pointer;
    transition: transform 0.2s;
    
    &:hover {
      transform: scale(1.02);
    }
  }
  
  .fc-event-milestone {
    background: #8b5cf6;
    border-color: #7c3aed;
  }
  
  .fc-event-timeblock {
    background: #3b82f6;
    border-color: #2563eb;
  }
  
  .fc-event-standalone {
    background: #10b981;
    border-color: #059669;
  }
`;

interface CalendarProps {
  onEventClick?: (eventId: string) => void;
  onDateSelect?: (start: Date, end: Date) => void;
}

export const Calendar: React.FC<CalendarProps> = ({ onEventClick, onDateSelect }) => {
  const { calendarEvents, timeblocks, milestones } = useStore();
  
  const formatEvents = () => {
    const events = [
      ...calendarEvents.map((event: CalendarEvent) => ({
        id: event.id,
        title: event.title,
        start: event.date,
        time: event.time,
        className: 'fc-event-standalone',
        extendedProps: { type: 'event', data: event }
      })),
      ...timeblocks.map((block: TimeBlock) => ({
        id: block.id,
        title: block.title,
        start: block.startTime,
        end: block.endTime,
        className: 'fc-event-timeblock',
        extendedProps: { type: 'timeblock', data: block }
      })),
      ...milestones.map((milestone: Milestone) => ({
        id: milestone.id,
        title: milestone.title,
        start: milestone.dueDate,
        className: 'fc-event-milestone',
        extendedProps: { type: 'milestone', data: milestone }
      }))
    ];
    
    return events;
  };

  const handleEventClick = (info: any) => {
    if (onEventClick) {
      onEventClick(info.event.id);
    }
  };

  const handleDateSelect = (info: any) => {
    if (onDateSelect) {
      onDateSelect(info.start, info.end);
    }
  };

  return (
    <CalendarContainer>
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        headerToolbar={{
          left: 'prev,next today',
          center: 'title',
          right: 'dayGridMonth,timeGridWeek,timeGridDay'
        }}
        events={formatEvents()}
        eventClick={handleEventClick}
        selectable={true}
        select={handleDateSelect}
        nowIndicator={true}
        dayMaxEvents={true}
        eventTimeFormat={{
          hour: '2-digit',
          minute: '2-digit',
          hour12: false
        }}
      />
    </CalendarContainer>
  );
}; 