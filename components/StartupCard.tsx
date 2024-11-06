import { formatDate } from '@/lib/utils'
import { EyeIcon } from 'lucide-react'
import React from 'react'

const StartupCard = ({post}:{post:StartupTypeCard}) => {
  return (
    <li className='startup-card group'>
        <div className='flex-between'>
            <p className='startup_card_date'>
                {formatDate(post._createAt)}
            </p>
            <div className='flex gap-1.5'>
                <EyeIcon className='size-5'/>
                <span className='text-16-medium'>{post.views}</span>
            </div>
        </div>
    </li>
  )
}

export default StartupCard