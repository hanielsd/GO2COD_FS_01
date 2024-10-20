import { Icon } from '../icons/Icon'
import { EllipsisH } from '../icons/icons'
import Tooltip from './tooltip/Tooltip'

export default function Actions({ actions, item, isEven }) {
  const actionHandler = (handler, item, toggle) => {
    handler(item)
    toggle()
  }
  return (
    <Tooltip
      trigger={
        <div
          className={
            'p-2 rounded-full cursor-pointer transform duration-150 active:scale-110 ' +
            (isEven ? 'hover:bg-gray-200' : 'hover:bg-white')
          }
        >
          <Icon path={EllipsisH} size={16} />
        </div>
      }
      Content={({ toggle }) => (
        <div className='space-y-2'>
          <div className='text-sm p-2 px-4 uppercase text-gray-500 border-b'>
            Actions
          </div>
          <div className='space-y-1 pb-2'>
            {actions.map((action, actionIndex) => (
              <div
                key={actionIndex}
                className='py-[6px] px-3 mx-2 hover:bg-gray-200 rounded cursor-pointer grid grid-cols-4 gap-3'
                onClick={() => actionHandler(action.handler, item, toggle)}
              >
                <div className='flex items-center'> {action.icon}</div>
                <div className='col-span-3'>{action.label}</div>
              </div>
            ))}
          </div>
        </div>
      )}
    />
  )
}
