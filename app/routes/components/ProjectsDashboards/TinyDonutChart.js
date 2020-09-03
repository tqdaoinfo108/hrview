import React from 'react';
import {
    PieChart,
    Pie,
    Cell
} from 'recharts';

import colors from './../../../colors';
import PropTypes from 'prop-types';


const COLORS = [colors['yellow'], colors['red'], colors['success'], colors['yellow']];

const TinyDonutChart = (props) => {

    const data = [
        { name: 'Group A', value: props.valueA },
        { name: 'Group B', value: props.valueB },
        { name: 'Group C', value: props.valueC }
    ];

    return(
        <PieChart width={80} height={80}>
            <Pie
                data={data}
                dataKey="value"
                stroke={colors['white']}
                innerRadius={26}
                outerRadius={35}
                fill="#8884d8"
            >
                {
                    data.map((entry, index) => <Cell key={index} fill={COLORS[index % COLORS.length]} />)
                }
            </Pie>
        </PieChart>
    );
}


TinyDonutChart.propTypes = {
    valueA: PropTypes.node,
    ValueB: PropTypes.node,
    ValueC: PropTypes.node
};
TinyDonutChart.defaultProps = {
    valueA: 1,
    valueB: 1,
    valueC: 1
};

export { TinyDonutChart };
