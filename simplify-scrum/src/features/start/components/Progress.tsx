import { JourneyStep } from "../data/JourneyStep"
import { Settings } from '../../../pages/Settings';

interface Props{
    step: JourneyStep
}
export function Progress({step}: Props){

    return(
        <div className="header-progress-container">
            <ol className="header-progress-list">
                <li className={`header-progress-item user-select-none ${step >= 0 ? 'done' : 'todo'}`}>Welcome</li>
                <li className={`header-progress-item user-select-none ${step >= 1 ? 'done' : 'todo'}`}>Initial Settings</li>
                <li className={`header-progress-item user-select-none ${step >= 2 ? 'done' : 'todo'}`}>Team</li>
                <li className={`header-progress-item user-select-none ${step >= 3 ? 'done' : 'todo'}`}>Project</li>
            </ol>
      </div>
    )
}