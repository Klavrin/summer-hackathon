import React, { useState, useRef, useEffect } from 'react'

interface DraggableElementProps {
  innerText: string
  onDoubleClick: () => void
}

const DraggableElement = ({ innerText, onDoubleClick }: DraggableElementProps) => {
  // Element size (in px)
  const width = 128 // 8rem * 16px
  const height = 224 // 14rem * 16px

  const [position, setPosition] = useState({ x: 0, y: 0 })
  const dragging = useRef(false)
  const offset = useRef({ x: 0, y: 0 })

  useEffect(() => {
    // Center the element on mount
    const centerX = window.innerWidth / 2 - width / 2
    const centerY = window.innerHeight / 2 - height / 2
    setPosition({ x: centerX, y: centerY })
  }, [])

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    dragging.current = true
    offset.current = {
      x: e.clientX - position.x,
      y: e.clientY - position.y
    }
  }

  const handleMouseMove = (e: MouseEvent) => {
    if (!dragging.current) return
    setPosition({
      x: e.clientX - offset.current.x,
      y: e.clientY - offset.current.y
    })
  }

  const handleMouseUp = () => {
    dragging.current = false
  }

  React.useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mouseup', handleMouseUp)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseup', handleMouseUp)
    }
  }, [])

  return (
    <div
      onMouseDown={handleMouseDown}
      onDoubleClick={onDoubleClick}
      className="border-2 shadow-md rounded-xl z-50 bg-white flex flex-col justify-center items-center"
      style={{
        position: 'absolute',
        left: position.x,
        top: position.y,
        cursor: 'grab',
        width: `${width}px`,
        height: `${height}px`,
        userSelect: 'none'
      }}
    >
      <span className="font-semibold text-center">{innerText}</span>
      <span className="text-sm text-center text-neutral-400">(double click to open)</span>
    </div>
  )
}

export default DraggableElement
