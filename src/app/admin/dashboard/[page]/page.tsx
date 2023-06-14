"use client";
import React from "react";
import useGetDashboardGames from "@/requests/admin/hooks/useGetDashboardGames";
import EditProduct from "@/components/Product/EditProduct";
import {
  Table,
  TableContainer,
  Thead,
  Tr,
  Th,
  Td,
  Tbody,
  Tfoot,
  Spinner,
} from "@chakra-ui/react";
import style from "./page.module.css";
import { faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import useDeleteGame from "@/requests/admin/hooks/useDeleteGame";
import useAddGame from "@/requests/admin/hooks/useAddGame";
import useUpdateGame from "@/requests/admin/hooks/useUpdateGame";
import Pagination from "@/components/Pagination/Pagination";
import { useRouter } from "next/navigation";
type DashBoardSearchProps = {
  params: {
    page: number;
  };
};
const DashBoard = ({ params: { page } }: DashBoardSearchProps) => {
  const navigate = useRouter();
  const { data, isLoading, mutate } = useGetDashboardGames(page);
  const deleteGame = useDeleteGame();
  const addGame = useAddGame();
  const updateGame = useUpdateGame();
  console.log(data?.numberOfPages);
  return (
    <main className={style["dashboard"]}>
      {isLoading && <Spinner />}
      {data && (
        <>
          <button className={style["add-new__btn"]}>
            Add new game
            {
              <EditProduct
                onSubmit={(values) => {
                  addGame(values);
                }}
              />
            }
          </button>
          <TableContainer textAlign={"center"}>
            <Table variant="simple">
              <Thead>
                <Tr>
                  <Th>Id</Th>
                  <Th>Title</Th>
                  <Th>Price</Th>
                  <Th>Edit</Th>
                  <Th>Delete</Th>
                </Tr>
              </Thead>
              <Tbody>
                {data.games.map((game) => {
                  return (
                    <Tr key={game.id}>
                      <Td>{game.id}</Td>
                      <Td>{game.title}</Td>
                      <Td>{`${game.price.toFixed(2)} \u20ac`}</Td>
                      <Td>
                        {
                          <EditProduct
                            game={game}
                            onSubmit={async (values) => {
                              await updateGame(values, game.id);
                              mutate();
                            }}
                          />
                        }
                      </Td>
                      <Td>
                        {
                          <FontAwesomeIcon
                            icon={faX}
                            onClick={() => {
                              deleteGame(game.id);
                              mutate();
                            }}
                          />
                        }
                      </Td>
                    </Tr>
                  );
                })}
              </Tbody>
              <Tfoot></Tfoot>
            </Table>
          </TableContainer>
        </>
      )}
      {data && (
        <Pagination
          onChange={(value) => {
            navigate.push(`/admin/dashboard/${value}`);
          }}
          currentPage={page}
          pageCount={data.numberOfPages}
        ></Pagination>
      )}
    </main>
  );
};

export default DashBoard;
