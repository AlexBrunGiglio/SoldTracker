import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { UserDto } from './user-dto';

@Injectable({
    providedIn: 'root',
})
export class UsersService {
    usersRef: AngularFirestoreCollection<UserDto> = null;
    private dbPath = '/users';

    constructor(
        private db: AngularFirestore,
    ) {
        this.usersRef = db.collection(this.dbPath);
    }

    getAll(): AngularFirestoreCollection<UserDto> {
        return this.usersRef;
    }

    create(user: UserDto): any {
        return this.usersRef.add({ ...user });
    }

    update(id: string, data: any): Promise<void> {
        return this.usersRef.doc(id).update(data);
    }

    delete(id: string): Promise<void> {
        return this.usersRef.doc(id).delete();
    }
}
