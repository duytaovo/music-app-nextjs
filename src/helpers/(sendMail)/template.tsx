import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Img,
  Section,
  Tailwind,
  Text,
} from "@react-email/components";
const LOGO_URL =
  "https://raw.githubusercontent.com/bmo4401/sharing-image/24c12892643f585dbd22d5b525c4f94ddccb6a6f/bmo1.png";

const template = (OTP: number) => {
  return (
    <Html>
      <Tailwind>
        <Head />
        <Body className="font-sans bg-gray-50">
          <Container className="bg-white border border-gray-200 rounded-lg shadow-md mt-8 mx-auto p-8 w-full flex flex-col items-center ">
            <Img
              src={`${LOGO_URL}`}
              width={88}
              height={88}
              alt=""
              className="m-auto"
            />
            <Text className="text-blue-500 text-xs font-bold tracking-wide uppercase mb-2 text-center">
              Verify Your Identity
            </Text>
            <Heading className="text-gray-800 text-2xl font-medium text-center mb-4">
              Enter the following code to verify your identity.
            </Heading>
            <Text className="bg-gray-100 rounded-md  py-6 w-full  mb-6 text-4xl font-bold text-gray-800 tracking-wide  text-center ">
              {OTP}
            </Text>
            <Text className="text-gray-600 text-base font-normal leading-6 text-center">
              If you did not request this code, please disregard this message.
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export default template;

