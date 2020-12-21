export const MENU_ID = "menu-id";

export const initalData = [
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
    name: "Test 3",
    parent_id: null
  },
  {
    id: 8,
    name: "Test 4",
    parent_id: null
  },
  {
    id: 4,
    name: "Test 1 -> Sub 1",
    parent_id: 1
  },
  {
    id: 5,
    name: "Test 1 -> Sub 2",
    parent_id: 1
  },
  {
    id: 6,
    name: "Test 1 -> Sub 3",
    parent_id: 1
  },
  {
    id: 7,
    name: "Test 2 -> Sub 1",
    parent_id: 2
  },
  {
    id: 11,
    name: "Test 2 -> Sub 2",
    parent_id: 2
  },
  {
    id: 9,
    name: "Test 2 -> Sub 1 -> Super Sub -> 1",
    parent_id: 7
  },
  {
    id: 10,
    name: "Test 2 -> Sub 1 -> Super Sub -> 2",
    parent_id: 7
  }
];

export function nest(data, parentId = null) {
  return data.reduce((r, e) => {
    let obj = Object.assign({}, e);
    if (parentId === e.parent_id) {
      let children = nest(data, e.id);
      if (children.length) obj.nodes = children;
      r.push(obj);
    }
    return r;
  }, []);
}
