import { Fragment } from "react";
import { styled } from "styled-components/native";

import type { ReactNode } from "react";
import type { ViewProps } from "react-native";

import Divider from "@/components/Divider";

interface ListProps extends ViewProps {
  children: ReactNode[] | ReactNode;
  boundary?: boolean;
}

const List = styled.View`
  width: 200px;
`;

export const ListItem = styled.TouchableOpacity`
  padding-top: 20px;
  padding-bottom: 20px;
  border-top: 1px solid #d8d8d8;
  border-color: #d8d8d8;
  flex-direction: row;
  align-items: center;
  column-gap: 8px;
`;

/**
 * @param boundary whether the header and tail divider is shown.
 * @description children can be referenced to a list of {@link ListItem}
 */
export default ({ children, boundary = true, ...rest }: ListProps) => {
  return (
    <List {...rest}>
      {boundary && <Divider />}
      {Array.isArray(children)
        ? children.map((child, index, array) => (
            <Fragment key={index}>
              {child}
              {index !== array.length - 1 && <Divider />}
            </Fragment>
          ))
        : children}
      {boundary && <Divider />}
    </List>
  );
};
