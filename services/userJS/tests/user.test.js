import {handler as createHandler} from "../create";
import {handler as getHandler} from "../get";
import {handler as listHandler} from "../list";
import {handler as updateHandler} from "../update";
import {handler as deleteHandler} from "../delete";

import createUser from "../events/create-user.json"

import getUser from "../events/get-user.json"

import listUsers from "../events/list-user.json"

import updateUser from "../events/update-user.json"

import deleteUser from "../events/delete-user.json"

describe('testing user cruds', () => {
  const context = {}
  test("test create user", async() => {
    let response = await createHandler(createUser, context)
    expect(response.statusCode).toEqual(200);
  },30000);

  test("test get user", async() => {
    let response = await getHandler(getUser, context)
    expect(response.statusCode).toEqual(200);
  },30000);

  test("test list users", async() => {
    let response = await listHandler(listUsers, context)
    expect(response.statusCode).toEqual(200);
  },30000);

  test("test update user", async() => {
    let response = await updateHandler(updateUser, context)
    expect(response.statusCode).toEqual(200);
  },30000);

  test("test delete user", async() => {
    let response = await deleteHandler(deleteUser, context)
    expect(response.statusCode).toEqual(200);
  },30000);
})
