import dynamic from 'next/dynamic'

const ReactQuill = dynamic(() => import('react-quill'), {
  ssr: false,
  loading: () => <p>Loading component...</p>
})

type CompanyDescriptionProps = {
  description: string
  setDescription: (description: string) => void
}

export const CompanyDescription: React.FC<CompanyDescriptionProps> = (props) => {
  const handleQuillChange = (content: string) => {
    props.setDescription(content)
  }

  return (
    <ReactQuill
      theme='snow'
      value={props.description}
      className='[&_.ql-editor]:min-h-[200px] [&_.ql-container]:mb-2 [&_.ql-editor]:text-[16px]'
      onChange={handleQuillChange}
      modules={{
        toolbar: [
          [{ header: [1, 2, 3, 4, 5, 6, false] }],
          ['bold', 'italic', 'underline', 'strike'],
          [{ color: [] }, { background: [] }],
          [{ font: [] }],
          [{ align: [] }],
          [{ list: 'ordered' }, { list: 'bullet' }],
          [{ script: 'sub' }, { script: 'super' }],
          ['blockquote', 'code-block'],
          ['link', 'image', 'video'],
          [{ indent: '-1' }, { indent: '+1' }],
          ['clean']
        ]
      }}
    />
  )
}
