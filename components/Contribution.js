export const Contribution = ({item}) => {
	console.log(item)
  return (
    <div className="contribution">
			<div>
				<h2 className={item.data.longtitle && `longtitle`}>{item.data.title}</h2>
				{item.data.cover_image.url &&
					<div className="image">
						<img src={item.data.cover_image.url}/>
					</div>
				}
			</div>
			<p className="name">{item.data.full_name}</p>
		</div>
  );
};
