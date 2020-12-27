import React, { useState } from 'react'

type PropsType = {
   addCardToCollection: (valueEng: string, valueRus: string) => void
}

const CardInputs: React.FC<PropsType> = ({ addCardToCollection }) => {
   const [valueEng, setValueEng] = useState('')
   const [valueRus, setValueRus] = useState('')

   return (
      <>
         <input
            type='text'
            style={{ border: '1px blue solid' }}
            required
            value={valueEng}
            onChange={(e) => setValueEng(String(e.currentTarget.value))}
            placeholder={'Eng'}
         />
         <input
            type='text'
            style={{ border: '1px blue solid' }}
            required
            value={valueRus}
            onChange={(e) => setValueRus(String(e.currentTarget.value))}
            placeholder={'Rus'}
         />
         <button onClick={() => addCardToCollection(valueEng, valueRus)}>Add card</button>
      </>
   )
}

export default React.memo(CardInputs, (prevProps, nextProps) => {
   return prevProps === nextProps
})
