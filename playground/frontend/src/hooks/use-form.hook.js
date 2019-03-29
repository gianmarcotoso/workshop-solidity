import { useState, useRef, useEffect } from 'react'

export const useForm = (initialValue, transformFunction) => {
	const transform = typeof transformFunction === 'function' ? transformFunction : data => data
	const initialData = transform(initialValue)

	const [data, setData] = useState(initialData)
	const dataRef = useRef(initialData)

	// A ref is required because setData will trigger a render operation, but onChange might get
	// called again before the render completes, leaving us with a stale `data` value. Using a
	// ref solves this problem because it gets updated immediately and does not wait for the next
	// render to complete.
	function updateData(update) {
		dataRef.current = update
		setData(update)
	}

	/*
      - onChange(event)
      uses the event's `name` and `value` (or `checked` if the type of the target is "checkbox")
      to update the state's corresponding value
  
      - onChange(delta, shouldReplaceState)
      merges `delta` with the state or, if `shouldReplaceState` is true, replaces the state with
      delta altogether
  
      - onChange(name, value)
      sets the key with the name contained in `name` on the state to `value`
    */
	const onChange = (...args) => {
		if (args.length === 0) {
			return data
		}

		const [maybeEvent] = args

		if (maybeEvent.nativeEvent && maybeEvent.nativeEvent instanceof Event) {
			const [event] = args

			const update = transform({
				...dataRef.current,
				[event.target.name]:
					event.target.type === 'checkbox' ? event.target.checked : event.target.value,
			})

			updateData(update)

			return update
		}

		if (typeof maybeEvent === 'object') {
			const [delta, shouldReplaceState] = args
			const update = shouldReplaceState
				? transform(delta)
				: transform({ ...dataRef.current, ...delta })

			updateData(update)

			return update
		}

		const [name, value] = args
		const update = transform({
			...dataRef.current,
			[name]: value,
		})

		updateData(update)

		return update
	}

	return [data, onChange]
}
