'use client'

import { useRef } from 'react'
import classes from './imagePicker.module.css'

export default function ImagePicker({ label, name }: { label: string; name: string }) {
  const imageInputRef = useRef<HTMLInputElement>(null)

  return (
    <div className={classes.picker}>
      <label htmlFor={name}>{label}</label>
      <div className={classes.controls}>
        <input
          className={classes.input}
          type="file"
          id={name}
          accept="image/png, image/jpeg"
          name={name}
          ref={imageInputRef}
        />
        <button className={classes.button} type="button" onClick={() => imageInputRef.current?.click()}>
          Pick an Image
        </button>
      </div>
    </div>
  )
}
