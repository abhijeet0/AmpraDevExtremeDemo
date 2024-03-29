import React, { useState } from "react";
import { FileUploader } from "devextreme-react";
import notify from "devextreme/ui/notify";

export default {
	title: "Async Upload",
	component: FileUploader
};

export const AsyncChunkUpload = () => {
	const [chunks, setChunks] = useState([]);
	const onUploadProgress = e => {
		const chunk = {
			segmentSize: e.segmentSize,
			bytesLoaded: e.bytesLoaded,
			bytesTotal: e.bytesTotal
		};
		setChunks([...chunks, chunk]);
	};

	const onUploadStarted = () => {
		setChunks([]);
		notify("upload started");
	};

	const onUploaded = () => {
		notify("Upload finished successfully!");
	};

	const getValueInKb = value => `${(value / 1024).toFixed(0)}kb`;

	return (
		<React.Fragment>
			<FileUploader
				name="file"
				accept="image/*"
				uploadUrl="https://js.devexpress.com/Demos/WidgetsGalleryDataService/api/ChunkUpload"
				chunkSize={200000}
				onUploadStarted={onUploadStarted}
				onProgress={onUploadProgress}
				onUploaded={onUploaded}
			/>
			<p className="note">
				Allowed file extensions: <span>.jpg, .jpeg, .gif, .png</span>.
			</p>
			<p className="note">
				Maximum file size: <span>4 MB.</span>
			</p>
			<div className="chunk-panel">
				{chunks.map((c, i) => {
					return (
						<div key={i}>
							<span>Chunk size:</span>
							<span className="segment-size dx-theme-accent-as-text-color">
								{getValueInKb(c.segmentSize)}
							</span>
							<span>, Uploaded:</span>
							<span className="loaded-size dx-theme-accent-as-text-color">
								{getValueInKb(c.bytesLoaded)}
							</span>
							<span>/</span>
							<span className="total-size dx-theme-accent-as-text-color">
								{getValueInKb(c.bytesTotal)}
							</span>
						</div>
					);
				})}
			</div>
		</React.Fragment>
	);
};
