import { useState } from 'react'
import { Calendar, Plus, Trash2, Clock, AlertCircle } from 'lucide-react'
import { format, isBefore, parseISO } from 'date-fns'
import DateCard from './components/DateCard'
import DateForm from './components/DateForm'
import './App.css'

export interface DateEvent {
  id: string
  title: string
  date: string
  description: string
  priority: 'low' | 'medium' | 'high'
  completed: boolean
}

function App() {
  const [events, setEvents] = useState<DateEvent[]>([
    {
      id: '1',
      title: 'Project Deadline',
      date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      description: 'Complete the Q2 project submission',
      priority: 'high',
      completed: false,
    },
    {
      id: '2',
      title: 'Team Meeting',
      date: new Date().toISOString().split('T')[0],
      description: 'Weekly sync with the development team',
      priority: 'medium',
      completed: false,
    },
  ])
  const [showForm, setShowForm] = useState(false)
  const [filter, setFilter] = useState<'all' | 'upcoming' | 'overdue' | 'completed'>('all')

  const addEvent = (newEvent: Omit<DateEvent, 'id' | 'completed'>) => {
    setEvents([
      ...events,
      {
        ...newEvent,
        id: Date.now().toString(),
        completed: false,
      },
    ])
    setShowForm(false)
  }

  const deleteEvent = (id: string) => {
    setEvents(events.filter(event => event.id !== id))
  }

  const toggleComplete = (id: string) => {
    setEvents(
      events.map(event =>
        event.id === id ? { ...event, completed: !event.completed } : event
      )
    )
  }

  const getFilteredEvents = () => {
    const today = new Date()
    today.setHours(0, 0, 0, 0)

    return events.filter(event => {
      if (filter === 'completed') return event.completed
      if (filter === 'completed') return event.completed
      
      const eventDate = parseISO(event.date)
      
      if (filter === 'upcoming') {
        return !event.completed && !isBefore(eventDate, today)
      }
      if (filter === 'overdue') {
        return !event.completed && isBefore(eventDate, today)
      }
      return true
    })
  }

  const filteredEvents = getFilteredEvents()
  const upcomingCount = events.filter(
    e => !e.completed && !isBefore(parseISO(e.date), new Date())
  ).length
  const overdueCount = events.filter(
    e => !e.completed && isBefore(parseISO(e.date), new Date())
  ).length

  return (
    <div className="app">
      <header className="app-header">
        <div className="header-content">
          <div className="header-title">
            <Calendar size={32} />
            <h1>Dates</h1>
          </div>
          <p className="header-subtitle">Manage your important dates and deadlines</p>
        </div>
      </header>

      <main className="app-main">
        <div className="stats-bar">
          <div className="stat-item">
            <Clock size={20} />
            <div>
              <span className="stat-label">Upcoming</span>
              <span className="stat-value">{upcomingCount}</span>
            </div>
          </div>
          <div className="stat-item alert">
            <AlertCircle size={20} />
            <div>
              <span className="stat-label">Overdue</span>
              <span className="stat-value">{overdueCount}</span>
            </div>
          </div>
        </div>

        <div className="controls">
          <div className="filter-buttons">
            <button
              className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
              onClick={() => setFilter('all')}
            >
              All
            </button>
            <button
              className={`filter-btn ${filter === 'upcoming' ? 'active' : ''}`}
              onClick={() => setFilter('upcoming')}
            >
              Upcoming
            </button>
            <button
              className={`filter-btn ${filter === 'overdue' ? 'active' : ''}`}
              onClick={() => setFilter('overdue')}
            >
              Overdue
            </button>
            <button
              className={`filter-btn ${filter === 'completed' ? 'active' : ''}`}
              onClick={() => setFilter('completed')}
            >
              Completed
            </button>
          </div>
          <button className="btn-primary" onClick={() => setShowForm(!showForm)}>
            <Plus size={20} />
            Add Event
          </button>
        </div>

        {showForm && (
          <div className="form-container">
            <DateForm onSubmit={addEvent} onCancel={() => setShowForm(false)} />
          </div>
        )}

        <div className="events-list">
          {filteredEvents.length === 0 ? (
            <div className="empty-state">
              <Calendar size={48} />
              <p>No events found</p>
              <span>Add a new event to get started</span>
            </div>
          ) : (
            filteredEvents.map(event => (
              <DateCard
                key={event.id}
                event={event}
                onDelete={deleteEvent}
                onToggle={toggleComplete}
              />
            ))
          )}
        </div>
      </main>
    </div>
  )
}

export default App
