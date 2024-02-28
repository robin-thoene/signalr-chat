import React, { FunctionComponent, ReactElement } from 'react';

import DarkModeToggle from '../../darkModeToggle';
import LanguageSelector from '../../languageSelector';

/**
 * Basic top navigation to display the logo.
 * @returns {ReactElement} The top navigation component.
 */
const NavigationTop: FunctionComponent = (): ReactElement => {
    return (
        <div className="navbar min-h-max border-b border-base-200 bg-base-100 p-3 shadow-sm">
            <div className="grid w-full grid-cols-2">
                <div className="flex items-center justify-end">
                    <DarkModeToggle />
                    <LanguageSelector />
                </div>
            </div>
        </div>
    );
};

export default NavigationTop;
