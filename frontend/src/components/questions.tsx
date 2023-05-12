import React, { useState, useEffect } from "react";
import { List, Avatar, ButtonGroup, Button } from "@douyinfe/semi-ui";
import { useSelector, useDispatch } from "react-redux";
import { acceptQuestion } from "../features/post/postSlice";
import Chat from "./Chat";

const ContentList = () => {
  const [questions, setQuestions] = useState([]);
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    fetch(`http://localhost:8000/api/questions/${user._id}/`)
      .then((response) => response.json())
      .then((data) => setQuestions(data))
      .catch((error) => console.error(error));
  }, []);

  const handleAccept = (id) => {
    dispatch(
      acceptQuestion({
        taId: user._id,
        questionId: id,
      })
    );

    if (id) {
      window.location.href = `/questions/${user._id}/q_id/${id}`;
    }
  };

  const renderItem = (question) => (
    <List.Item
      key={question._id}
      header={
        <Avatar color="blue">
          {question.category ? question.category.charAt(0).toUpperCase() : "O"}
        </Avatar>
      }
      main={
        <div>
          <span style={{ color: "var(--semi-color-text-0)", fontWeight: 500 }}>
            {question.title}
          </span>
          <p
            style={{
              color: "var(--semi-color-text-2)",
              margin: "4px 0",
              width: 500,
            }}
          >
            {question.body.slice(0, 30)}...
          </p>
        </div>
      }
      extra={
        <ButtonGroup theme="borderless">
          <Button>{`Bounty: ${question.bounty}`}</Button>
          <Button onClick={() => handleAccept(question._id)}>Accept</Button>
        </ButtonGroup>
      }
    />
  );

  return (
    <div style={{ padding: 12, border: "1px solid var(--semi-color-border)" }}>
      <List dataSource={questions} renderItem={renderItem} />
    </div>
  );
};

export default ContentList;
