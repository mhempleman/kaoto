import { Button, Tooltip } from '@patternfly/react-core';
import { EllipsisVIcon } from '@patternfly/react-icons';
import { ContextMenu, PointIface } from '@patternfly/react-topology';
import { FunctionComponent, MouseEventHandler, useRef, useState } from 'react';
import { NodeContextMenu } from '../ContextMenu/NodeContextMenu';
import { CustomGroupProps } from './Group.models';

interface ContextMenuButtonProps {
  element: CustomGroupProps['element'];
}

export const ContextMenuButton: FunctionComponent<ContextMenuButtonProps> = ({ element }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const reference = useRef<PointIface>({ x: 0, y: 0 });
  const id = element.getId();

  const onClick: MouseEventHandler<HTMLButtonElement> & MouseEventHandler<HTMLDivElement> = (event) => {
    event.stopPropagation();
    reference.current = { x: event.clientX, y: event.clientY };
    setIsOpen(!isOpen);
  };

  return (
    <>
      <Tooltip content="Contextual menu">
        <Button className="container-controls" variant="control" onClick={onClick} data-testid={`contextualMenu-${id}`}>
          <EllipsisVIcon />
        </Button>
      </Tooltip>
      <ContextMenu
        reference={reference.current}
        open={isOpen}
        onRequestClose={() => {
          setIsOpen(false);
        }}
      >
        <NodeContextMenu element={element} />
      </ContextMenu>
    </>
  );
};
