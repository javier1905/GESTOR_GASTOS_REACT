import { memo } from 'react'

import './listCategories.css'
import Category from '../CATEGORY/category'

const ListCategories = memo(({ listCategories, refreshListCategories }) => {
	return (
		<div className='container_listCategories'>
			<table id='table_categories'>
				<thead>
					<tr>
						<th>Id</th>
						<th>Description</th>
						<th>Edit</th>
						<th>Delete</th>
					</tr>
				</thead>
				<tbody>
					{Array.isArray(listCategories) ? (
						listCategories.map(category => (
							<Category
								refreshListCategories={refreshListCategories}
								key={category.idCategoria}
								category={category}
							/>
						))
					) : (
						<tr>
							<td colSpan='4'></td>
						</tr>
					)}
				</tbody>
			</table>
		</div>
	)
})

export default ListCategories
