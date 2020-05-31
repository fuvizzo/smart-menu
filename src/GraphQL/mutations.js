import gql from 'graphql-tag';

const SEND_CONTACT_REQUEST = gql`
  mutation sendContactRequest(
    $email: String!
    $firstName: String!
    $lastName: String!
    $message: String!
    $captchaValue: String!
  ) {
    sendContactRequest(
      email: $email
      firstName: $firstName
      lastName: $lastName
      message: $message
      captchaValue: $captchaValue
    )
  }
`;

export { SEND_CONTACT_REQUEST };
