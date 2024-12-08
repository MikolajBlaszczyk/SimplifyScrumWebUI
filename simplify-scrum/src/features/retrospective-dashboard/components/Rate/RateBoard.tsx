import React, { useEffect, useState } from 'react';
import { useRetro } from '../../../../hooks/useContexts';

const values = [1, 2, 3, 5, 8, 13];

const valueLabels: { [key: number]: string } = {
    1: 'Very Bad',
    2: 'Bad',
    3: 'Average',
    5: 'Good',
    8: 'Very Good',
    13: 'Excellent'
};

export function RateBoard() {
    const { state, setState } = useRetro();
    
    const [ratings, setRatings] = useState<{ [key: string]: number }>({});

    useEffect(() => {
        setRatings(state.Rating);
    }, [state.Rating]);

    const handleRatingClick = (category: string, value: number) => {
       
        setState({
            ...state,
            Rating: {
                ...state.Rating,
                [category]: value
            }
        });
    };

    useEffect(() => {
        setRatings(state.Rating);
    }, [ratings]);

    return (
        <section className="d-flex s-retro-board p-4 w-100 h-100 justify-content-center rounded">
            <div className="rating-categories">
                {Object.keys(state.Rating).map((category) => (
                    <div key={category} className="rating-category">
                        <h4 className="category-title">{category}</h4>
                        <div className="rating-scale">
                            {values.map((value) => (
                                <button
                                    key={value}
                                    className={`rating-button ${ratings[category] === value ? 'selected' : ''}`}
                                    onClick={() => handleRatingClick(category, value)}
                                    title={valueLabels[value]}
                                >
                                    {value}
                                </button>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}

