import { Trash2, CheckCircle2, Circle, AlertCircle } from 'lucide-react'
import { format, parseISO, isBefore } from 'date-fns'
import { DateEvent } from '../App'
import './DateCard.css'

interface DateCardProps {
  event: DateEvent
  onDelete: (id: string) => void
  onToggle: (id: string) => void
}

function DateCard({ event, onDelete, onToggle }: DateCardProps) {
  const eventDate = parseISO(event.date)
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  
  const isOverdue = !event.completed && isBefore(eventDate, today)
  const isToday = eventDate.toDateString() === today.toDateString()
  
  const priorityColors = {
    low: 'priority-low',
    medium: 'priority-medium',
    high: 'priority-high',
  }

  return (
    <div className={`date-card ${event.completed ? 'completed' : ''} ${isOverdue ? 'overdue' : ''}`}>
      <div className="card-header">
        <button className="toggle-btn" onClick={() => onToggle(event.id)} title="Mark as complete">
          {event.completed ? (
            <CheckCircle2 size={24} />
          ) : (
            <Circle size={24} />
          )}
        </button>
        <button className="delete-btn" onClick={() => onDelete(event.id)} title="Delete event">
          <Trash2 size={20} />
        </button>
      </div>

      <div className="card-content">
        <h3 className="card-title">{event.title}</h3>
        
        <div className="card-meta">
          <div className="meta-item">
            {isToday && <span className="badge badge-today">Today</span>}
            {isOverdue && <span className="badge badge-overdue">Overdue</span>}
            <time className="date">
              {format(eventDate, 'MMM d, yyyy')}
            </time>
          </div>
          <span className={`priority-badge ${priorityColors[event.priority]}`}>
            {event.priority.charAt(0).toUpperCase() + event.priority.slice(1)}
          </span>
        </div>

        {event.description && (
          <p className="card-description">{event.description}</p>
        )}
      </div>

      {isOverdue && (
        <div className="overdue-indicator">
          <AlertCircle size={16} />
          <span>Past due</span>
        </div>
      )}
    </div>
  )
}

export default DateCard
