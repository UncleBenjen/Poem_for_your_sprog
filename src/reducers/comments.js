const constants = require('../constants');

const initialState = { list: [], selected: 0, filter: 'new', loading: false, subloading: false  }

function update(state = initialState, action) {

	switch (action.type) {
		case constants.FETCH_COMMENTS:
			return Object.assign({}, state, { loading: true })

		case constants.RECEIVE_COMMENTS:

			let list = [];
			/* parse the npm packages */
			action.json.comments.map(function (c, i) {
				list.push(
					{
						id: c.data.id,
						author: c.data.author,
						body: c.data.body_html,
						created: c.data.created,
						gilded: c.data.gilded,
						score:c.data.score,
						parent_thread:{
							id: c.data.link_id,
							url: c.data.link_url,
							author: c.data.link_author,
							title: c.data.link_title
						},
						parent_comment:{
							id: c.data.parent_id.split('_')[1],
							author: null,
							body: null,
							created: null,
							score: null
						},
						subreddit:{ 
							name: c.data.subreddit, 
							id: c.data.subreddit_id 
						}
					}
				)
			})

			return Object.assign({}, state, { list: list, loading: false } )

		case constants.FETCH_PARENT_COMMENT:
			return Object.assign({}, state, { subloading: true })

		case constants.RECEIVE_PARENT_COMMENT:
			/*console.log(...state.list.slice(0, state.selected))
			console.log(Object.assign({}, state.list[state.selected], { parent_comment: { id: state.list[state.selected].parent_comment.id, author: action.json.comment.author, body:action.json.comment.body_html, created:action.json.comment.created, score: action.json.comment.score } } ) )
			console.log(...state.list.slice(state.selected + 1))
*/

			return Object.assign({}, state, { subloading: false, list: [
					...state.list.slice(0, state.selected),
					Object.assign({}, state.list[state.selected], { parent_comment: { id: state.list[state.selected].parent_comment.id, author: action.json.comment.author, body:action.json.comment.body_html, created:action.json.comment.created, score: action.json.comment.score } } ),
					...state.list.slice(state.selected + 1)
				]})

		case constants.CHANGE_FILTER:
			return Object.assign({}, state, { selected: 0, filter: action.filter, loading: true } )

		case constants.SELECT_COMMENT:
			return Object.assign({}, state, { selected: action.id })

		case constants.NEXT_COMMENT:
			console.log(state.selected + 1)
			let next_index = state.selected
			if (state.selected < (state.list.length - 1)){
				next_index++
			}
			return Object.assign({}, state, { selected: next_index })

		case constants.PREV_COMMENT:

			let prev_index = state.selected
			if (state.selected != 0){
				prev_index--
			}
			return Object.assign({}, state, { selected: prev_index })

		default:
			return state
  }
}

module.exports = update;
