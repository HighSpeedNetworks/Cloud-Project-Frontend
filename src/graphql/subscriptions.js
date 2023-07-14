/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateRoom = /* GraphQL */ `
  subscription OnCreateRoom {
    onCreateRoom {
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
export const onCreateMessageByRoomId = /* GraphQL */ `
  subscription OnCreateMessageByRoomId($roomId: ID) {
    onCreateMessageByRoomId(roomId: $roomId) {
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
export const onUpdateMessage = /* GraphQL */ `
  subscription OnUpdateMessage($roomId: ID) {
    onUpdateMessage(roomId: $roomId) {
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
