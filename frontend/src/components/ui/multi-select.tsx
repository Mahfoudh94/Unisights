"use client"

import * as React from "react"
import { X } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Command, CommandGroup, CommandItem } from "@/components/ui/command"
import { Command as CommandPrimitive } from "cmdk"

export interface MultiSelectProps {
  value: string[]
  onValueChange: (value: string[]) => void
  disabled?: boolean
  children: React.ReactNode
}

export function MultiSelect({ value, onValueChange, disabled = false, children }: MultiSelectProps) {
  const inputRef = React.useRef<HTMLInputElement>(null)
  const [open, setOpen] = React.useState(false)
  const [selected, setSelected] = React.useState<string[]>(value || [])
  const [inputValue, setInputValue] = React.useState("")

  React.useEffect(() => {
    setSelected(value || [])
  }, [value])

  React.useEffect(() => {
    onValueChange(selected)
  }, [selected, onValueChange])

  const handleUnselect = React.useCallback((item: string) => {
    setSelected((prev) => prev.filter((s) => s !== item))
  }, [])

  const handleKeyDown = React.useCallback(
    (e: React.KeyboardEvent<HTMLDivElement>) => {
      const input = inputRef.current
      if (input) {
        if (e.key === "Delete" || e.key === "Backspace") {
          if (input.value === "" && selected.length > 0) {
            setSelected((prev) => {
              const newSelected = [...prev]
              newSelected.pop()
              return newSelected
            })
          }
        }
        // This is not a default behavior of the <input /> field
        if (e.key === "Escape") {
          input.blur()
        }
      }
    },
    [selected],
  )

  const selectables = React.useMemo(() => {
    return React.Children.map(children, (child) => {
      if (React.isValidElement(child) && child.type === MultiSelectContent) {
        return child.props.children
      }
      return null
    }).filter(Boolean)
  }, [children])

  const handleSelect = React.useCallback((item: string) => {
    setSelected((prev) => {
      if (prev.includes(item)) {
        return prev.filter((s) => s !== item)
      }
      return [...prev, item]
    })
    setInputValue("")
  }, [])

  const items = React.useMemo(() => {
    return React.Children.map(selectables, (child) => {
      if (React.isValidElement(child) && child.type === MultiSelectItem) {
        return {
          value: child.props.value,
          label: child.props.children,
        }
      }
      return null
    }).filter(Boolean)
  }, [selectables])

  const selectedItems = React.useMemo(() => {
    return items.filter((item) => selected.includes(item.value))
  }, [items, selected])

  return (
    <Command onKeyDown={handleKeyDown} className="overflow-visible bg-transparent">
      <div className="group border border-input px-3 py-2 text-sm ring-offset-background rounded-md focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2">
        <div className="flex gap-1 flex-wrap">
          {selectedItems.map((item) => (
            <Badge key={item.value} variant="secondary" className="mb-1">
              {item.label}
              <button
                className="ml-1 ring-offset-background rounded-full outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleUnselect(item.value)
                  }
                }}
                onMouseDown={(e) => {
                  e.preventDefault()
                  e.stopPropagation()
                }}
                onClick={() => handleUnselect(item.value)}
                disabled={disabled}
              >
                <X className="h-3 w-3 text-muted-foreground hover:text-foreground" />
              </button>
            </Badge>
          ))}
          <CommandPrimitive.Input
            ref={inputRef}
            value={inputValue}
            onValueChange={setInputValue}
            onBlur={() => setOpen(false)}
            onFocus={() => setOpen(true)}
            placeholder="Select items..."
            disabled={disabled}
            className="ml-2 bg-transparent outline-none placeholder:text-muted-foreground flex-1"
          />
        </div>
      </div>
      <div className="relative mt-2">
        {open && (
          <div className="absolute w-full z-10 top-0 rounded-md border bg-popover text-popover-foreground shadow-md outline-none animate-in">
            {children}
          </div>
        )}
      </div>
    </Command>
  )
}

export function MultiSelectContent({ children }: { children: React.ReactNode }) {
  return <CommandGroup className="h-full overflow-auto max-h-[200px]">{children}</CommandGroup>
}

export function MultiSelectItem({
  value,
  children,
}: {
  value: string
  children: React.ReactNode
}) {
  return (
    <CommandItem value={value} className="cursor-pointer">
      {children}
    </CommandItem>
  )
}

export function MultiSelectTrigger({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}

export function MultiSelectValue({
  placeholder,
}: {
  placeholder: string
}) {
  return <span className="text-muted-foreground">{placeholder}</span>
}

