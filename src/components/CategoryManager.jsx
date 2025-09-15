import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeWidget } from "../store/store";
import { Form } from "react-bootstrap";

function CategoryManager() {
  const { categories } = useSelector((state) => state.dashboard);
  const dispatch = useDispatch();

  const handleUncheck = (categoryId, widgetId) => {
    dispatch(removeWidget({ categoryId, widgetId }));
  };

  return (
    <div className="p-3 border rounded bg-light mt-4">
      <h5>Manage Categories</h5>
      {categories.map((cat) => (
        <div key={cat.id} className="mb-3">
          <strong>{cat.name}</strong>
          {cat.widgets.map((widget) => (
            <Form.Check
              key={widget.id}
              type="checkbox"
              label={widget.name}
              defaultChecked
              onChange={(e) => {
                if (!e.target.checked) {
                  handleUncheck(cat.id, widget.id);
                }
              }}
            />
          ))}
        </div>
      ))}
    </div>
  );
}

export default CategoryManager;
