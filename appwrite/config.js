import conf from "../conf/conf";
import { Client, Databases, Storage, Query, ID } from "appwrite";

export class Services {
    client = new Client ();
    databases;
    bucket;

    constructor() {
        this.client.setEndpoint(conf.appwriteUrl).setProject(conf.appwriteProjectId);
        this.databases = new Databases(this.client);
        this.bucket = new Storage(this.client);
    }

    async createJournal({title, slug, content, featuredImage, Status, userID}) {
        try {
            return await this.databases.createDocument (
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,
                {title, content, featuredImage, Status, userID}
            )
        }
        catch (error){
            console.log("Appwrite serive :: createJournal :: error", error);
        }
    }

    async updateJournal(slug, {title, content, featuredImage, Status}) {
        try {
            return await this.databases.updateDocument (
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,
                {title, content, featuredImage, Status}
            )
        }
        catch (error) {
            console.log("Appwrite serive :: updateJournal :: error", error);
        }
    }

    async deleteJournal(slug) {
        try {
            await this.databases.deleteDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,
            )
            return true;
        }
        catch (error) {
            console.log("Appwrite serive :: deleteJournal :: error", error);
            return false;
        }
    }

    async getJournal(slug){
        try {
            return await this.databases.getDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug
            
            )
        } catch (error) {
            console.log("Appwrite service :: getJournal :: error", error);
            return false
        }
    }

    async getJournals(queries = [Query.equal('Status', 'active')]) {
        try {
            return this.databases.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                queries,
            )
        }
        catch(error){
            console.log("Appwrite serive :: getJournals :: error", error);
            return false
        }
    }

    async uploadFile(file) {
        try {
            return await this.bucket.createFile(
                conf.appwriteBucketId,
                ID.unique(),
                file
            )
        }
        catch(error) {
            console.log("Appwrite serive :: uploadFile :: error", error);
            return false
        }
    }

    async deleteFile(file){
        try {
            await this.bucket.deleteFile(
                conf.appwriteBucketId,
                file
            )
            return true
        } catch (error) {
            console.log("Appwrite serive :: deleteFile :: error", error);
            return false
        }
    }

    getFilePreview(file){
        return this.bucket.getFilePreview(
            conf.appwriteBucketId,
            file
        )
    }
}


const services  = new Services();
export default services;

