/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const listRooms = /* GraphQL */ `
  query ListRooms($limit: Int) {
    listRooms(limit: $limit) {
      items {
        id
        name
        messages {
          items {
            id
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
      nextToken
      __typename
    }
  }
`;
export const listMessagesForRoom = /* GraphQL */ `
  query ListMessagesForRoom($roomId: ID!, $sortDirection: ModelSortDirection) {
    listMessagesForRoom(roomId: $roomId, sortDirection: $sortDirection) {
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
  }
`;
