import React from 'react';
import * as Ink from 'ink';
import glob from 'glob';

interface FolderProps {
	pathName: string;
}

const Folder: React.FC<FolderProps> = (props) => {
	const { pathName } = props;
	const { isFocused } = Ink.useFocus();

	return <Ink.Text color={isFocused ? 'red' : 'white'}>{pathName}</Ink.Text>;
};

const App = () => {
	const [folders, setFolders] = React.useState<string[]>([]);
	React.useEffect(() => {
		glob(
			'*/',
			{
				cwd: process.cwd(),
			},
			(error, matches) => {
				if (error) {
					return console.log(error);
				}

				setFolders(matches);
			},
		);
	}, []);

	return (
		<Ink.Box flexDirection="column">
			{folders.map((folder) => {
				return <Folder pathName={folder} key={folder} />;
			})}
		</Ink.Box>
	);
};

export default App;
