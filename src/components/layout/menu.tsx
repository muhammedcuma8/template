import React, {
  createRef,
  forwardRef,
  useCallback,
  useEffect,
  useState,
} from 'react';
import { NavLink } from 'react-router-dom';
import { classNames } from 'primereact/utils';
import { CSSTransition } from 'react-transition-group';
import { Ripple } from 'primereact/ripple';
import Tooltip from '../basic/ktnTooltip';
import { Badge } from 'primereact/badge';
import { BaseMenu } from '../../utils/types/baseMenu';

type AppMenuProps = {
  model: BaseMenu[];
  onMenuItemClick: (event: any) => void;
  onRootMenuItemClick: (event: any) => void;
  menuMode: string;
  active: boolean;
};

const AppSubmenu = forwardRef((props: any, ref: any) => {
  const [activeIndex, setActiveIndex] = useState<any>(null);

  const onMenuItemClick = (event: any, item: any, index: any) => {
    if (item.disabled) {
      event.preventDefault();
      return true;
    }

    if (props.root && props.onRootMenuItemClick) {
      props.onRootItemClick({
        originalEvent: event,
        item: item,
      });
    }

    //execute command
    if (item.command) {
      item.command({ originalEvent: event, item: item });
      event.preventDefault();
    }

    if (item.items) {
      setActiveIndex(activeIndex === index ? null : index);
    } else {
      if (props.menuMode !== 'static') {
        const ink = getInk(event.currentTarget);
        if (ink) {
          removeClass(ink, 'p-ink-active');
        }
      }
    }

    if (props.onMenuItemClick) {
      props.onMenuItemClick({
        originalEvent: event,
        item: item,
      });
    }
  };

  const getInk = (el: any) => {
    for (let i = 0; i < el.children.length; i++) {
      if (
        typeof el.children[i].className === 'string' &&
        el.children[i].className.indexOf('p-ink') !== -1
      ) {
        return el.children[i];
      }
    }
    return null;
  };

  const removeClass = (element: any, className: string) => {
    if (element.classList) element.classList.remove(className);
    else
      element.className = element.className.replace(
        new RegExp(
          '(^|\\b)' + className.split(' ').join('|') + '(\\b|$)',
          'gi'
        ),
        ' '
      );
  };

  const onMenuItemMouseEnter = (index: any) => {
    if (props.root && props.menuActive && isHorizontalOrSlim() && !isMobile()) {
      setActiveIndex(index);
    }
  };

  const visible = (item: any) => {
    return typeof item.visible === 'function'
      ? item.visible()
      : item.visible !== false;
  };

  const isHorizontalOrSlim = useCallback(() => {
    return props.menuMode === 'horizontal' || props.menuMode === 'slim';
  }, [props.menuMode]);

  const isMobile = useCallback(() => {
    return window.innerWidth < 1025;
  }, []);

  const isHorizontal = () => {
    return props.menuMode === 'horizontal';
  };
  const isSlim = () => {
    return props.menuMode === 'slim';
  };

  useEffect(() => {
    if (!props.menuActive && isHorizontalOrSlim() && !isMobile()) {
      setActiveIndex(null);
    }
  }, [props.menuActive, isHorizontalOrSlim, isMobile]);

  const getLink = (item: any, index: any) => {
    const menuitemIconClassName = classNames('layout-menuitem-icon', item.icon);
    const content = (
      <>
        <i className={menuitemIconClassName}></i>
        <span className="layout-menuitem-text">{item.label}</span>
        {item.badge && (
          <Badge
            value={item.badge}
            style={item.badgeStyle}
            className={classNames(item.badgeClassName, 'p-badge-no-gutter')}
          />
        )}
        {item.items && (
          <i className="pi pi-fw pi-angle-down layout-submenu-toggler"></i>
        )}
        <Ripple />
      </>
    );
    const commonLinkProps = {
      style: item.style,
      className: classNames(item.className, 'p-ripple tooltip', {
        'p-disabled': item.disabled,
        'p-link': !item.to,
      }),
      target: item.target,
      onClick: (e: React.SyntheticEvent) => onMenuItemClick(e, item, index),
      onMouseEnter: () => onMenuItemMouseEnter(index),
    };

    if (item.url) {
      return (
        <a
          data-pr-tooltip={props.root && item.label}
          href={item.url}
          rel="noopener noreferrer"
          {...commonLinkProps}
        >
          {content}
        </a>
      );
    } else if (!item.to) {
      return (
        <a
          data-pr-tooltip={props.root && item.label}
          type="button"
          {...commonLinkProps}
        >
          {content}
        </a>
      );
    }

    return (
      <NavLink
        data-pr-tooltip={props.root && item.label}
        to={item.to}
        {...commonLinkProps}
        className={({ isActive }) =>
          classNames(
            commonLinkProps.className,
            isActive ? 'router-link-active' : undefined
          )
        }
      >
        {content}
      </NavLink>
    );
  };

  const getItems = () => {
    const transitionTimeout = props.root ? 0 : { enter: 1000, exit: 450 };
    return props.items.map((item: any, i: any) => {
      if (visible(item)) {
        const submenuRef = createRef();
        const active = activeIndex === i;
        let styleClass = classNames(
          item.badgeStyleClass,
          { 'active-menuitem': active },
          { 'layout-root-menuitem': props.root }
        );
        const link = getLink(item, i);
        let tooltip = props.root && (
          <div>
            <span
              className="layout-menuitem-text"
              style={{ textTransform: 'uppercase' }}
            >
              {item.label}
            </span>
          </div>
        );

        return (
          <li key={item.label || i} className={styleClass} role="menuitem">
            {link}
            {tooltip}
            <CSSTransition
              // @ts-ignore
              nodeRef={submenuRef}
              classNames="layout-submenu-container"
              timeout={transitionTimeout}
              in={
                item.items &&
                (props.root &&
                !(
                  (isHorizontal() || isSlim()) &&
                  !isMobile() &&
                  (!isSlim() || (isSlim() && activeIndex !== null))
                )
                  ? true
                  : active)
              }
              unmountOnExit
            >
              <AppSubmenu
                ref={submenuRef}
                items={visible(item) && item.items}
                onMenuItemClick={props.onMenuItemClick}
                menuMode={props.menuMode}
                menuActive={props.menuActive}
                parentMenuItemActive={active}
              ></AppSubmenu>
            </CSSTransition>
          </li>
        );
      }

      return null;
    });
  };

  if (!props.items) {
    return null;
  }

  const items = getItems();

  return (
    <>
      <ul ref={ref} role="menu" className={props.className}>
        {items}
      </ul>
      {isSlim() && props.root && (
        <Tooltip target="li:not(.active-menuitem)>.tooltip" />
      )}
    </>
  );
});

const AppMenu: React.FC<AppMenuProps> = (props) => {
  return (
    <AppSubmenu
      items={props.model}
      className="layout-menu"
      menuActive={props.active}
      onRootItemClick={props.onRootMenuItemClick}
      onMenuItemClick={props.onMenuItemClick}
      root={true}
      menuMode={props.menuMode}
      parentMenuItemActive={true}
    />
  );
};

export default AppMenu;
