import React, { Component } from "react";

export default class CompletedList extends Component {

    public render() {
        return (
            <div style={{marginTop: 15}}>
                <h3>Completed List</h3>
                <table className="ui compact sortable definition selectable basic table">
                    <thead className="full-width">
                        <tr>
                            <th></th>
                            <th>Title</th>
                            <th>Description</th>
                            <th>Priority</th>
                            <th>Actions</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>

                    </tbody>
                </table>
            </div>
        );
    }
}
