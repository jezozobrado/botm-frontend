import { Button, Spinner } from "@chakra-ui/react";
import useAddItem from "../hooks/useAddItem";
import { useEffect, useState } from "react";
import useCartStore from "../store/cartStore";
import { Book } from "../entities/Book";
import useUserStore from "../store/userStore";
import useCart from "../hooks/useCart";

interface Props {
  book: Book;
}

const AddToBoxButton = ({ book }: Props) => {
  const { user } = useUserStore();
  const [disabled, setIsDisabled] = useState(false);

  const setCurrent = useCartStore((s) => s.setCurrent);
  const current = useCartStore((s) => s.current);
  const removeClick = useCartStore((s) => s.removeClick);

  const addItem = useAddItem();
  const setIsMoreThanThree = useCartStore((s) => s.setIsMoreThanThree);

  if (addItem.isError) setIsMoreThanThree(true);

  const { data: cart, isFetching, isLoading } = useCart([removeClick]);

  useEffect(
    () =>
      setIsDisabled(Boolean(cart?.books.find((b) => b.title === book.title))),
    [isFetching]
  );

  return (
    <>
      {isLoading ? (
        <Button
          variant="btn-primary"
          width={{ base: "85vw ", md: "70%" }}
          alignSelf={{ base: "center", md: "normal" }}
          paddingX={{ md: "40px" }}
          paddingY="23px"
        >
          Add to box
        </Button>
      ) : (
        <Button
          isDisabled={disabled}
          _disabled={{
            bgColor: "gray.300",
            _hover: { bgColor: "gray.300" },
          }}
          variant="btn-primary"
          width={{ base: "100% ", md: "70%" }}
          alignSelf={{ base: "center", md: "normal" }}
          paddingX={{ md: "40px" }}
          paddingY="23px"
          onClick={() => {
            setIsDisabled(true);
            addItem
              .mutateAsync({ book: book, customer: user?._id })
              .then((res) => {})
              .catch(() => {
                setIsDisabled(false);
              })
              .finally(() => setCurrent());
          }}
        >
          {addItem.isLoading ? (
            <Spinner />
          ) : disabled ? (
            "Already picked"
          ) : (
            "Add to box"
          )}
        </Button>
      )}
    </>
  );
};

export default AddToBoxButton;
