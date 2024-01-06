'use client'

import { ChangeEvent, useEffect, useRef, useState } from 'react'
import Image from 'next/image'

import classes from './imagePicker.module.css'

export default function ImagePicker({ label, name }: { label: string; name: string }) {
  const [pickedImage, setpickedImage] = useState<string | null>(null)
  const imageInputRef = useRef<HTMLInputElement>(null)

  function handleChangeImage(ev: ChangeEvent<HTMLInputElement>) {
    const file = ev.target.files?.[0]
    setpickedImage(file ? URL.createObjectURL(file) : null)
  }

  useEffect(() => {
    // Giải phóng URL khi component bị hủy
    return () => {
      if (pickedImage) {
        URL.revokeObjectURL(pickedImage)
      }
    }
  }, [pickedImage])

  return (
    <div className={classes.picker}>
      <label htmlFor={name}>{label}</label>
      <div className={classes.controls}>
        <div className={classes.preview}>
          {!pickedImage && <p>No image picked yet.</p>}
          {pickedImage && <Image src={pickedImage.toString()} alt="The image selected by the user." fill />}
        </div>
        <input
          className={classes.input}
          type="file"
          id={name}
          accept="image/*"
          name={name}
          ref={imageInputRef}
          onChange={handleChangeImage}
          required
        />
        <button className={classes.button} type="button" onClick={() => imageInputRef.current?.click()}>
          Pick an Image
        </button>
      </div>
    </div>
  )
}
