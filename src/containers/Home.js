import React, { useState, useEffect } from "react";
import { API } from "aws-amplify";
import { Link } from "react-router-dom";
import { BsPencilSquare } from "react-icons/bs";
import ListGroup from "react-bootstrap/ListGroup";
import { LinkContainer } from "react-router-bootstrap";
import { useAppContext } from "../libs/contextLib";
import { onError } from "../libs/errorLib";
import "./Home.css";
import _ from "lodash";

export default function Home() {
  const [notes, setNotes] = useState([]);
  const [filteredNotes, setFilteredNotes] = useState([]);
  const { isAuthenticated } = useAppContext();
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState("");
  const [replaceText, setReplaceText] = useState("");
  
  useEffect(() => {
    async function onLoad() {
      if (!isAuthenticated) {
        return;
      }

      try {
        const notes = await loadNotes();
        //const notes = ["Hello Sam!", "The note for Sam", "Note #3"]//temp for test
        setNotes(notes);
        setFilteredNotes(notes);
      } catch (e) {
        onError(e);
      }

      setIsLoading(false);
    }

    onLoad();
  }, [isAuthenticated]);
  
  function loadNotes() {
    return API.get("notes", "/notes");
  }

  function renderNotesList(notes) {
    return (
      <>
        {isLoading && <div style={{
            width: "100%",
            borderRadius: 10,
            border: "3px dashed green",
            textAlign: "center",
            marginTop: "10px",
            marginBottom: "10px"
          }}> Loading ... </div> }
        {!isLoading && <>
          Search (Results will be filter on typing. Case Insensitive.): 
          <input type="text" value={filter} 
            onChange={(e)=>{
              setIsLoading(true);
              setFilter(e.target.value)
              setFilteredNotes(_.cloneDeep(notes).filter(n => 
                n.content.toLowerCase().indexOf(e.target.value.toLowerCase())!==-1 ))
              setIsLoading(false);
            }} 
          />
          Replace (search text above will be replaced with this value. Case Insensitive. ): 
          <input type="text" value={replaceText} 
            onChange={(e)=>{
              setReplaceText(e.target.value)
            }} 
          />
          <div
            style={{
              width: 270,
              height: 26,
              borderRadius: 5,
              border: "1px solid grey",
              textAlign: "center",
              marginTop: "10px",
              marginBottom: "10px",
              cursor: "pointer"
            }}
            onClick={(e)=>{
              setIsLoading(true);
              let nt = _.cloneDeep(notes);
              console.log(filter, replaceText)
              nt.forEach(n => n.content = n.content.split(filter).join(replaceText));
              setFilteredNotes(nt);
              setIsLoading(false);
            }} 
          > REPLACE SEARCH TEXT IN NOTES </div>
        </>}

        <LinkContainer to="/notes/new">
          <ListGroup.Item action className="py-3 text-nowrap text-truncate">
            <BsPencilSquare size={17} />
            <span className="ml-2 font-weight-bold">Create a new note</span>
            
          </ListGroup.Item>
        </LinkContainer>
        {filteredNotes.map(({ noteId, content, createdAt }) => (
          <LinkContainer key={noteId} to={`/notes/${noteId}`}>
            <ListGroup.Item action>
              <span className="font-weight-bold">
                {content.trim().split("\n")[0]}
              </span>
              <br />
              <span className="text-muted">
                Created: {new Date(createdAt).toLocaleString()}
              </span>
            </ListGroup.Item>
          </LinkContainer>
        ))}
      </>
    );
  }

  function renderLander() {
    return (
      <div className="lander">
        <h1>Scratch</h1>
        <p className="text-muted">A simple note taking app</p>
        <div className="pt-3">
          <Link to="/login" className="btn btn-info btn-lg mr-3">
            Login
          </Link>
          <Link to="/signup" className="btn btn-success btn-lg">
            Signup
          </Link>
        </div>
      </div>
    );
  }

  function renderNotes() {
    return (
      <div className="notes">
        <h2 className="pb-3 mt-4 mb-3 border-bottom">Your Notes</h2>
        <ListGroup>{!isLoading && renderNotesList(notes)}</ListGroup>
      </div>
    );
  }
  
  return (
    <div className="Home">
      {isAuthenticated ? renderNotes() : renderLander()}
    </div>
  );
}
