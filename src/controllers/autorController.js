import { autor } from "../models/Autor.js";

class AutorController{

    static async listarAutores (req, res) {
        try {
            const listaAutores = await autor.find({});
            res.status(200).json(listaAutores);
        } catch (erro) {
            res.status(500).json({ message: `${erro.message} - falha na requisição dos autores.`});
        }
    };

    static async listarAutorPorId (req, res, next) {
        try {
            const id = req.params.id;
            const autorResultado = await autor.findById(id);
            if (autorResultado !== null){
                res.status(200).send(autorResultado);
            } else {
                res.status(404).send({message: "Id do Autor não localizado."});
            }
        } catch (erro) {
            next(erro);
        }
    };

    static cadastrarAutor = async (req, res, next) => {
        try {
            let autor = new autor(req.body);
            const autorResultado = await autor.save();
            res.status(201).send({ message: autorResultado.toJSON()});
        } catch (erro){
            next(erro);
        }
    };

    static async atualizarAutor (req, res, next) {
        try {
            const id = req.params.id;
            await autor.findByIdAndUpdate(id, req.body);
            res.status(200).json({ message: "autor atualizado"});
        } catch (erro) {
            next(erro);
        }
    };

    static async excluirAutor (req, res, next) {
        try {
            const id = req.params.id;
            await autor.findByIdAndDelete(id);
            res.status(200).json({ message: "autor excluído com sucesso."});
        } catch (erro) {
            next(erro);
        }
    };

};

export default AutorController;