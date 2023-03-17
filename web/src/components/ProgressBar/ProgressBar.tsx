import { useEffect, useState } from 'react';
import * as Progress from '@radix-ui/react-progress';
import './styles.css';

interface ProgressBarProps {
    value: number;
}

export function ProgressBar(props: ProgressBarProps) {
    return (
        <Progress.Root className="ProgressRoot" value={props.value}>
            <Progress.Indicator
                className="ProgressIndicator"
                style={{ transform: `translateX(-${100 - props.value}%)` }}
            />
        </Progress.Root>
    )
}