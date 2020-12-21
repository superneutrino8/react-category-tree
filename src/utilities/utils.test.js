import { nest } from "./utils";

const inputDataNest = [
  {
    id: 1,
    name: "Test 1",
    parent_id: null
  },
  {
    id: 2,
    name: "Test 2",
    parent_id: null
  },
  {
    id: 3,
    name: "Test 2 -> Sub1",
    parent_id: 2
  },
  {
    id: 4,
    name: "Test 2 -> Sub1 -> SuperSub1",
    parent_id: 3
  }
];

const outputDataNest = [
  {
    id: 1,
    name: "Test 1",
    parent_id: null
  },
  {
    id: 2,
    name: "Test 2",
    parent_id: null,
    nodes: [
      {
        id: 3,
        name: "Test 2 -> Sub1",
        parent_id: 2,
        nodes: [
          {
            id: 4,
            name: "Test 2 -> Sub1 -> SuperSub1",
            parent_id: 3
          }
        ]
      }
    ]
  }
];

test("Nested Array Of Objects Check", () => {
  expect(nest(inputDataNest)).toEqual(outputDataNest);
});
