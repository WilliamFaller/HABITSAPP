import React from 'react';
import * as Progress from '@radix-ui/react-progress';
import './styles.css';

interface ProgressBarProps {
    value: number;
}

const ProgressBar = (props: ProgressBarProps) => {
    let value = props.value;

    if (value > 100) {
        value = 100;
    }
    if (value < 0) {
        value = 0;
    }

  const [progress, setProgress] = React.useState(0);

  React.useEffect(() => {
    const timer = setTimeout(() => setProgress(value), 200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Progress.Root className="ProgressRoot" value={value}>
      <Progress.Indicator
        className="ProgressIndicator"
        style={{ transform: `translateX(-${100 - progress}%)` }}
      />
    </Progress.Root>
  );
};

export default ProgressBar;


/*
import * as Progress from '@radix-ui/react-progress';
import React from 'react';
import './styles.css';

interface ProgressBarProps {
    progress: number;
}

export function ProgressBar(props: ProgressBarProps) {

    const ProgressDemo = () => {
        const [progress, setProgress] = React.useState(13);

    React.useEffect(() => {
        const timer = setTimeout(() => setProgress(66), 500);
        return () => clearTimeout(timer);
    }, []);


    return (
        <Progress.Root>
            <Progress.Indicator
                className="ProgressIndicator"
                style={{ transform: 'translateX(-$(100 - progress)%)' }}
            />

        </Progress.Root>
    )
    }


}






*/
/*
interface ProgressBarProps {
    progress: number;
}

export function ProgressBar(props: ProgressBarProps) {
    return (
        <div className="h-3 rounded-xl bg-zinc-700 w-full mt-4">
            <div
            role="progressbar" 
            aria-label="Progresso de hábitos completados nesse dia"
            aria-aria-valuenow={props.progress}
            className="h-3 rounded-xl bg-violet-600"
            style={{width: `${props.progress}%`}}
            />
        </div>
    )
}
*/
