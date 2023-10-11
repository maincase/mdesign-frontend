import { SyntheticEvent } from 'react'
import { MonoTypeOperatorFunction, tap } from 'rxjs'

export function preventDefault<T extends Event | SyntheticEvent>(): MonoTypeOperatorFunction<T> {
  return tap((e) => {
    e.preventDefault()
    e.stopPropagation()
  })
}
