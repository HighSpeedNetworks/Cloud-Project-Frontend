/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createMessage = /* GraphQL */ `
  mutation CreateMessage($input: MessageInput!) {
    createMessage(input: $input) {
      id
      content {
        text
        imageId
        __typename
      }
      owner
      createdAt
      updatedAt
      roomId
      __typename
    }
  }
`;
export const updateMessage = /* GraphQL */ `
  mutation UpdateMessage($input: MessageInput!) {
    updateMessage(input: $input) {
      id
      content {
        text
        imageId
        __typename
      }
      owner
      createdAt
      updatedAt
      roomId
      __typename
    }
  }
`;
export const createRoom = /* GraphQL */ `
  mutation CreateRoom($input: RoomInput!) {
    createRoom(input: $input) {
      id
      name
      messages {
        items {
          id
          content {
            text
            imageId
            __typename
          }
          owner
          createdAt
          updatedAt
          roomId
          __typename
        }
        nextToken
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
  }
`;
