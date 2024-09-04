import { InterfaceDeclaration, Project, TypeAliasDeclaration } from "ts-morph";

/**
 * Vue defineComponent needs props keys to be passed as an array of strings.
 * This script reads the type definitions of the props and generates a file with the keys.
 * Saved in src/props-keys.ts
 */

interface Config { name: string, file: string, type: string }

const PROPS_CONFIG : Config[]  = [

    {
        name: 'comments',
        file: "comments.d.ts",
        type: "CommentsProps"
    },

    {
        name: 'comment-count',
        file: "comment-counts.d.ts",
        type: "CommentCountProps"
    },

    {
        name: 'memberships',
        file: "memberships.d.ts",
        type: "MembershipsProps"
    },

    {
        name: 'gated-content',
        file: "memberships.d.ts",
        type: "GatedContentProps"
    },

    {
        name: 'newsletter',
        file: "newsletters.d.ts",
        type: "NewslettersProps"
    }

];

function getProps(config: Config) {

    // Create a new project
    const project = new Project();

    const fileName = "node_modules/@hyvor/hyvor-talk-base/dist/" + config.file;

    // Add the type definition to the project
    project.addSourceFileAtPath(fileName);

    // Get the source file
    const sourceFile = project.getSourceFileOrThrow(fileName);

    // Find the CommentsProps type alias declaration
    let commentsPropsType : TypeAliasDeclaration | InterfaceDeclaration | undefined = sourceFile.getTypeAlias(config.type);

    if (!commentsPropsType) {
        commentsPropsType = sourceFile.getInterface(config.type);
    }

    if (!commentsPropsType) {
        throw new Error(`Type ${config.type} not found in ${fileName}`);
    }

    const type = commentsPropsType.getType();
    const properties = type.getProperties();
    return properties.map(prop => nameKebabToCamel(prop.getName()));

}

function nameKebabToCamel(name: string) {
    return name.replace(/-([a-z0-9])/g, (g) => g[1].toUpperCase());
}

const props = {} as Record<string, string[]>;

for (const config of PROPS_CONFIG) {
    props[config.name] = getProps(config);
}


const output = `export const PROPS_KEYS = ${JSON.stringify(props, null, 4)};`;

Bun.write('src/props-keys.ts', output);