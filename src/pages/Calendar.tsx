import React, { useState } from 'react';
import styled from '@emotion/styled';
import { Calendar } from '../components/features/calendar/Calendar';
import { useStore } from '../store/useStore';
import { CalendarEvent, TimeBlock, Milestone } from '../types';

const PageContainer = styled.div`
  padding: 20px;
  height: 100%;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

const Title = styled.h1`
  font-size: 2rem;
  color: #ffffff;
  margin: 0;
`;

const AddButton = styled.button`
  background: #3b82f6;
  color: white;
  border: none;
  border-radius: 8px;
  padding: 10px 20px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background: #2563eb;
  }
`;

const Modal = styled.div<{ isOpen: boolean }>`
  display: ${props => props.isOpen ? 'flex' : 'none'};
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background: #1a1a1a;
  padding: 20px;
  border-radius: 8px;
  width: 100%;
  max-width: 500px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

const Label = styled.label`
  color: #ffffff;
  font-size: 0.9rem;
`;

const Input = styled.input`
  background: #2a2a2a;
  border: 1px solid #333333;
  border-radius: 4px;
  padding: 8px 12px;
  color: #ffffff;
  font-size: 1rem;

  &:focus {
    outline: none;
    border-color: #3b82f6;
  }
`;

const Select = styled.select`
  background: #2a2a2a;
  border: 1px solid #333333;
  border-radius: 4px;
  padding: 8px 12px;
  color: #ffffff;
  font-size: 1rem;

  &:focus {
    outline: none;
    border-color: #3b82f6;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 20px;
`;

const Button = styled.button<{ variant?: 'primary' | 'secondary' }>`
  background: ${props => props.variant === 'primary' ? '#3b82f6' : '#333333'};
  color: white;
  border: none;
  border-radius: 4px;
  padding: 8px 16px;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background: ${props => props.variant === 'primary' ? '#2563eb' : '#444444'};
  }
`;

export const CalendarPage: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDates, setSelectedDates] = useState<{ start: Date; end: Date } | null>(null);
  const [eventType, setEventType] = useState<'event' | 'timeblock' | 'milestone'>('event');
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    xp: ''
  });

  const { addCalendarEvent, addTimeBlock, addMilestone, categories } = useStore();

  const handleEventClick = (eventId: string) => {
    // TODO: Implement event details view/edit
    console.log('Event clicked:', eventId);
  };

  const handleDateSelect = (start: Date, end: Date) => {
    setSelectedDates({ start, end });
    setIsModalOpen(true);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedDates) return;

    const baseData = {
      id: Date.now().toString(),
      title: formData.title,
      description: formData.description,
      category: formData.category,
      xp: parseInt(formData.xp) || 0
    };

    switch (eventType) {
      case 'event':
        addCalendarEvent({
          ...baseData,
          date: selectedDates.start,
          time: selectedDates.start.toLocaleTimeString()
        });
        break;
      case 'timeblock':
        addTimeBlock({
          ...baseData,
          startTime: selectedDates.start,
          endTime: selectedDates.end
        });
        break;
      case 'milestone':
        addMilestone({
          ...baseData,
          dueDate: selectedDates.start,
          completed: false,
          linkedQuests: []
        });
        break;
    }

    setIsModalOpen(false);
    setFormData({ title: '', description: '', category: '', xp: '' });
  };

  return (
    <PageContainer>
      <Header>
        <Title>Calendar</Title>
        <AddButton onClick={() => setIsModalOpen(true)}>Add Event</AddButton>
      </Header>

      <Calendar onEventClick={handleEventClick} onDateSelect={handleDateSelect} />

      <Modal isOpen={isModalOpen} onClick={() => setIsModalOpen(false)}>
        <ModalContent onClick={e => e.stopPropagation()}>
          <Form onSubmit={handleSubmit}>
            <FormGroup>
              <Label>Event Type</Label>
              <Select
                value={eventType}
                onChange={e => setEventType(e.target.value as any)}
              >
                <option value="event">Standalone Event</option>
                <option value="timeblock">Time Block</option>
                <option value="milestone">Milestone</option>
              </Select>
            </FormGroup>

            <FormGroup>
              <Label>Title</Label>
              <Input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                required
              />
            </FormGroup>

            <FormGroup>
              <Label>Description</Label>
              <Input
                type="text"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
              />
            </FormGroup>

            <FormGroup>
              <Label>Category</Label>
              <Select
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                required
              >
                <option value="">Select a category</option>
                {categories.map(category => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </Select>
            </FormGroup>

            <FormGroup>
              <Label>XP Value</Label>
              <Input
                type="number"
                name="xp"
                value={formData.xp}
                onChange={handleInputChange}
                min="0"
                required
              />
            </FormGroup>

            <ButtonGroup>
              <Button onClick={() => setIsModalOpen(false)}>Cancel</Button>
              <Button type="submit" variant="primary">Save</Button>
            </ButtonGroup>
          </Form>
        </ModalContent>
      </Modal>
    </PageContainer>
  );
}; 