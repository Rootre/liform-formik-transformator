import React, {useEffect, useState} from 'react';
import classNames from 'classnames';

import styles from './styles.scss';

function Dropdown({
                      activeItem,
                      activeItemTemplate,
                      className,
                      disabled,
                      hasError,
                      items,
                      itemTemplate,
                      onDidMount,
                      onSelect,
                      placeholder,
                      nameKey,
                  }) {
    const [opened, setOpened] = useState(false);
    const [active, setActive] = useState(activeItem || items[0]);
    const dropdownRef = React.createRef();

    useEffect(() => {
        self.document.addEventListener('click', handleDocumentInteraction, true);

        typeof onDidMount === 'function' && onDidMount.call(this, active);

        return () => {
            self.document.removeEventListener('click', handleDocumentInteraction, true);
        }
    }, []);
    useEffect(() => {
        if (!activeItem || activeItem[nameKey] === active[nameKey]) {
            return;
        }

        setActive(activeItem);
    }, [activeItem]);


    function toggleOpen() {
        if (disabled) {
            return;
        }

        setOpened(!opened);
    }

    function select(item, e) {
        if (disabled) {
            return;
        }

        setActive(item);
        setOpened(false);

        if (typeof onSelect === 'function') {
            onSelect.call(this, item, e);
        }
    }

    const handleDocumentInteraction = ({target}) => {
        if (closed || !dropdownRef.current || dropdownRef.current.contains(target)) {
            return;
        }

        setOpened(false);
    };

    return (
        <div ref={dropdownRef} className={classNames(styles.dropdown, className, {
            [styles.disabled]: disabled,
            [styles.error]: hasError,
            [styles.opened]: opened,
        })}>
            <p className={styles.activeItem} onClick={() => toggleOpen()}>
                {_activeItemHTML(activeItemTemplate, nameKey, active)}
            </p>
            {opened && (
                <div className={styles.dropdownContent}>
                    <div className={styles.list}>
                        {_itemsTemplate(items, itemTemplate, nameKey, select)}
                    </div>
                </div>
            )}
        </div>
    )
}

function _activeItemHTML(activeItemTemplate, nameKey, activeItem) {
    return activeItemTemplate
        ? activeItemTemplate(activeItem)
        : <span>{activeItem[nameKey]}</span>;
}

function _itemsTemplate(items, itemTemplate, nameKey, onClick) {
    return items.map((item, i) => (
        <div key={i} className={styles.item} onClick={e => onClick(item, e)}>
            {itemTemplate
                ? itemTemplate(item)
                : <span>{item[nameKey]}</span>
            }
        </div>
    ));
}

/**
 * @type {object}
 * @property {function} [activeItemTemplate] - takes item and event object and returns jsx
 * @property {string} [className]
 * @property {object[]} items
 * @property {function} [itemTemplate] - takes item and event object and returns jsx
 * @property {function} [onSelect] - fires upon item selection
 * @property {string} [placeholder] - placeholder text to show if no item is selected
 * @property {string} nameKey - item key
 * @property {object} [activeItem] - currently selected item
 * @property {boolean} [disabled] - when dropdown is disabled, it will not react to any user action
 * @property {boolean} [customized] - customized dropdown, full height, scrollbar always visible on mobile
 */
Dropdown.defaultProps = {
    activeItem: {},
    activeItemTemplate: null,
    className: '',
    disabled: false,
    items: [],
    itemTemplate: null,
    onSelect: (__item, __e) => {},
    placeholder: '',
    nameKey: 'name',
};

export default Dropdown;