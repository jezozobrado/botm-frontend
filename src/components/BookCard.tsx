import {
  Badge,
  Card,
  CardBody,
  Container,
  HStack,
  Image,
  SimpleGrid,
  Stack,
  Text,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { Book } from "../entities/Book";
import useAddItem from "../hooks/useAddItem";
import useCartStore from "../store/cartStore";

import AddToBoxButton from "./AddToBoxButton";
import useUserStore from "../store/userStore";
import AddToBoxButtonUnauthenticated from "./HowItWorks/AddToBoxButtonUnauthenticated";

interface Props {
  book: Book;
}

const BookCard = ({ book }: Props) => {
  const badgeMap: { [key: string]: string } = {
    Debut: "green",
    "Repeat Author": "brand.200",
    "BOTY Finalist": "pink",
    "Book of the year": "brown",
  };

  const user = useUserStore((s) => s.user);

  const addItem = useAddItem();
  const setIsMoreThanThree = useCartStore((s) => s.setIsMoreThanThree);
  if (addItem.isError) setIsMoreThanThree(false);

  return (
    <SimpleGrid
      columns={{ base: 1, md: 2 }}
      margin="auto"
      width="fit-content"
      marginY={8}
    >
      <Link to={"/all-books/" + book.slug}>
        <Card
          variant="filled"
          width={{ base: "90vw", md: "430px" }}
          height={{ base: "340px", md: "100%" }}
          borderRadius={0}
          justifyContent="center"
          margin="auto"
        >
          <Container margin="auto" centerContent>
            <Image src={book.image} width="180px" />
          </Container>
        </Card>
      </Link>
      <Card
        width={{ base: "90vw", md: "430px" }}
        textAlign={{ base: "center", md: "left" }}
        height={{ base: "fit-content", md: "fit-content" }}
        borderRadius={0}
        padding={{ base: "1px", md: "20px" }}
      >
        <CardBody py={user ? "" : "40px"}>
          <Stack>
            <Text variant="text-tertiary">{book.mainGenre}</Text>
            <Link to={"/all-books/" + book.slug}>
              <Text variant="text-primary" textTransform="capitalize">
                {book.title}
              </Text>
            </Link>

            <HStack justifyContent={{ base: "center", md: "start" }}>
              {book.badges?.map((badge, index) => (
                <Badge
                  key={index}
                  width="fit-content"
                  bg={badgeMap[badge]}
                  color="white"
                  alignSelf={{ base: "center", md: "normal" }}
                  fontSize="11px"
                  fontWeight="normal"
                  paddingX="5px"
                  paddingY="2px"
                >
                  {badge}
                </Badge>
              ))}
            </HStack>

            <Text paddingBottom={{ base: "0", md: "20px" }} textAlign="left">
              {book.description}
            </Text>
            {user && <AddToBoxButton book={book} />}
          </Stack>
        </CardBody>
      </Card>
    </SimpleGrid>
  );
};

export default BookCard;
